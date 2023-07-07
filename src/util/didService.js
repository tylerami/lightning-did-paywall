import { Web5 } from "@tbd54566975/web5";

// Create a new instance of Web5
const { web5, did: userDid } = await Web5.connect();

console.log(userDid);

const baseUrl = "https://lightningPaywall.app";

export function getDid() {
  return userDid;
}

// Function to configure a protocol
async function configureProtocol() {
  const protocol = {
    'protocol':  `${baseUrl}/schemas/protocol`,
    'types': {
      'content': {
        'schema': "content",
        'dataFormats': ["application/json"],
      },
    },
    'structure': {
      'content': {
        '$actions': [
          {
            'who': "anyone",
            'can': "write",
          },
          {
            'who': "anyone",
            'can': "read",
          },
        ],
      },
    },
  };

  const { protocols, status } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: `${baseUrl}/schemas/protocol`,
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
      definition: protocol
    },
  });
  console.log("configure protocol status", configureStatus);
}

configureProtocol();

export async function writeContent(
  title,
  subtitle,
  body,
  satsAmount,
  lightningAddress
) {
  // Create the content data
  const contentData = {
    title: title,
    subtitle: subtitle,
    body: body,
    paywall: {
      satsAmount: satsAmount,
      lightningAddress: lightningAddress,
      hasPaid: [],
    },
  };

  // Create the content record
  const { record } = await web5.dwn.records.create({
    data: contentData,
    message: {
      dataFormat: "application/json",
      schema: "content",
    },
  });

  // Send the record to your DWN
  const { status } = await record.send("your-did-here");

  // Check the status of the send operation
  if (status === "success") {
    console.log("Content record created successfully!");
  } else {
    console.error("Failed to create content record:", status);
  }
}

// Function to get all record identifiers of a did
export async function getPaywalledContent(authorDid) {
  const records = await web5.dwn.records.query({
    did: authorDid,
    protocol: `${baseUrl}/schemas/protocol`,
    type: "content",
  });
  console.log(records);
  return records;
}

// Function to read a blog post
export async function unlockContent(authorDid, recordIdentifer, invoice) {
  // if (!verifiyInvoice(invoice)) return;

  const content = await web5.dwn.records.read({
    did: authorDid,
    record: recordIdentifer,
    protocol: "https://localhost:3000/schemas/paywallProtocol",
  });
}
