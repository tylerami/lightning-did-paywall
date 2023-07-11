import { Web5 } from "@tbd54566975/web5";
import paywallProtocol from "../schemas/paywallProtocol.json";

// Create a new instance of Web5
export const { web5, did: userDid } = await Web5.connect();

export const baseUrl = "https://lightningPaywall.app";

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
        protocol: `${baseUrl}/protocol`,
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

  const { status: configureStatus } = await web5.dwn.protocols.configure({
    message: {
      definition: paywallProtocol,
    },
  });
  console.log("configure protocol status", configureStatus);
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

export async function queryRecords({ protocol, schema, dataFormat, from }) {
  var filter = {
    protocol,
    schema,
    dataFormat,
  };
  console.log(filter);
  var query = {
    message: {
      filter,
    },
  };

  if (from) {
    query.from = from;
  }

  const result = await web5.dwn.records.query(query);
  return result?.records;
}

export async function upsertRecord({
  getExistingRecord,
  data,
  schema,
  protocol,
  protocolPath,
  published = false,
  format = "application/json",
  recordNullValues = false,
}) {
  const record = await getExistingRecord();

  var response;
  if (record) {
    if (format === "application/json") {
      const existingData = await record?.data?.json();
      if (!recordNullValues) {
        data = removeNullProperties(data);
      }
      console.log(data);
      response = await record.update({
        data: {
          ...existingData,
          ...data,
        },
      });
    } else {
      console.log(data);
      response = await record.update({
        data: data,
      });
    }
    console.log("updating record with type: ", response, schema);
  } else {
    response = await web5.dwn.records.create({
      data: data,
      message: {
        published,
        schema,
        protocol,
        protocolPath,
        format,
      },
    });
    console.log("creating record with type: ", response, schema);
  }
  return response;
}

function removeNullProperties(obj) {
  Object.keys(obj).forEach((key) => obj[key] == null && delete obj[key]);
  return obj;
}
