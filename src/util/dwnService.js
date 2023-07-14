import { Web5 } from "@tbd54566975/web5";
import { paywallProtocol, protocolUri } from "../schemas/paywallProtocol.js";

// Create a new instance of Web5
export const { web5, did: userDid } = await Web5.connect();

export function writeContent() {
  return;
}
export function getDid() {
  return userDid;
}

// Function to configure a protocol
async function configureProtocol() {
  const { protocols, status } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: protocolUri,
      },
    },
  });

  if (status.code !== 200) {
    alert("Failed to query protocols. check console");
    console.error("Failed to query protocols", status);

    return;
  }

  console.log("protocols: ", protocols);
  // protocol already exists
  if (protocols.length > 0) {
    console.log("protocol already exists");
    //  return;
  }

  try {
    const { protocol, status: configureStatus } =
      await web5.dwn.protocols.configure({
        message: {
          definition: paywallProtocol,
        },
      });
    console.log("configure protocol status", configureStatus);

    const { status: sendProtocolStatus } = await protocol.send(userDid);
    console.log("send protocol status: ", sendProtocolStatus);
  } catch (e) {
    console.log("error configuring protocol: ", e);
  }
}

configureProtocol();

export async function flattenRecord(record) {
  if (!record) return null;
  if (!record.data) return null;

  var data;
  console.log("record data: ", record.protocolPath,  record);
  try {
    data = await record?.data?.json();
    return {
      id: record.id,
      parentId: record.parentId,
      authorDid: record.author,
      recipientDid: record.recipient,
      ...data,
    };
  } catch (e) {
    console.log("could not parse data as json: ", e);
  }

  if (!data) {
    try {
      data = await record?.data?.blob();
    } catch (e) {
      console.log("could not parse data as json or blob: ", e);
    }
  }

  return {
    id: record.id,
    parentId: record.parentId,
    authorDid: record.author,
    recipientDid: record.recipient,
    data,
  };
}

export async function queryRecords({ schema, dataFormat, from, parentId }) {
  var filter = {
    protocol: protocolUri,
    schema,
  };
  if (parentId) {
    filter.parentId = parentId;
    filter.contextId = parentId;
  }
  if (dataFormat) {
    filter.dataFormat = dataFormat;
  }

  console.log("Querying with filter:  ", filter.schema, filter);
  var query = {
    message: {
      filter,
    },
  };

  if (from && from !== userDid) {
    query.from = from;
  }
  try {
    const result = await web5.dwn.records.query(query);
    console.log("query result: ", filter.schema, result);
    return result?.records;
  } catch (e) {
    console.log("error querying records: ", e);
    return null;
  }
}

export async function upsertRecord({
  getExistingRecord,
  data,
  schema,
  protocolPath,
  parentId,
  published = false,
  dataFormat = "application/json",
  recordNullValues = false,
}) {
  var record = await getExistingRecord();
  console.log("existing record: ", record);
  if (record) {
    var updateStatus;

    if (dataFormat === "application/json") {
      const existingData = await record?.data?.json();
      if (!recordNullValues) {
        data = removeNullProperties(data);
      }

      const { status } = await record.update({
        data: {
          ...existingData,
          ...data,
        },
      });
      updateStatus = status;
    } else {
      const { status } = await record.update({
        data: data,
      });
      updateStatus = status;
    }

    const { status: sendStatus } = await record.send(userDid);
    console.log("send status: ", protocolPath,  sendStatus);

    return { record, status: updateStatus };
  } else {
    console.log("creating record with type: ", schema);
    console.log("data is: ", data);

    var message = {
      published,
      schema,
      parentId,
      contextId: parentId,
      protocol: protocolUri,
      protocolPath,
      dataFormat,
    };
    message = removeNullProperties(message);

    const { record: createdRecord, status } = await web5.dwn.records.create({
      data: data,
      message: message,
    });

    if (status.code !== 202) {
      console.log("error creating record: ", status);
      return { record: null, status };
    } else {
      const { status: sendStatus } = await createdRecord.send(userDid);
      console.log("send status: ", protocolPath,  sendStatus);
    }

    return { record: createdRecord, status };
  }
}

function removeNullProperties(obj) {
  Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
  return obj;
}
