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

  // protocol already exists
  if (protocols.length > 0) {
    console.log("protocol already exists");
    return;
  }
  try {
    const { status: configureStatus } = await web5.dwn.protocols.configure({
      message: {
        definition: paywallProtocol,
      },
    });
    console.log("configure protocol status", configureStatus);
  } catch (e) {
    console.log("error configuring protocol: ", e);
  }
}

configureProtocol();

export async function flattenRecord(record) {
  if (!record) return null;

  const data = await record?.data?.json();
  return {
    id: record.id,
    parentId: record.parentId,
    authorDid: record.author,
    recipientDid: record.recipient,
    ...data,
  };
}

export async function queryRecords({
  schema,
  dataFormat = "application/json",
  from,
  parentId,
}) {
  var filter = {
    protocol: protocolUri,
    schema,
    dataFormat,
  };
  if (parentId) {
    filter.parentId = parentId;
    filter.contextId = parentId;
  }

  console.log("Querying with filter: ", filter);
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
    if (dataFormat === "application/json") {
      const existingData = await record?.data?.json();
      if (!recordNullValues) {
        data = removeNullProperties(data);
      }
      try {
        const { record: updatedRecord, status } = await record.update({
          data: {
            ...existingData,
            ...data,
          },
        });
        return { record: updatedRecord, status };
      } catch (e) {
        console.log("error updating record: ", e);
        return null;
      }
    } else {
      try {
        const { record: updatedRecord, status } = await record.update({
          data: data,
        });
        return { record: updatedRecord, status };
      } catch (e) {
        console.log("error updating record: ", e);
        return null;
      }
    }
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
    console.log(message);
    try {
      const { record: updatedRecord, status } = await web5.dwn.records.create({
        data: data,
        message: message,
      });
      return { record: updatedRecord, status };
    } catch (e) {
      console.log("error creating record: ", e);
      return null;
    }
  }
}

function removeNullProperties(obj) {
  Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
  return obj;
}
