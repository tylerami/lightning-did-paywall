import { baseUrl, web5, userDid } from "./dwnService";
import { getProfilePicture } from "./profileService";

export async function getAllContentMetadata(authorDid) {
  const profile = await getProfilePicture(authorDid);

  const records = await web5.dwn.records.query({
    from: authorDid,
    message: {
      filter: {
        protocolPath: "content",
        protocol: `${baseUrl}/schemas/protocol`,
        schema: "content",
        dataFormat: "application/json",
      },
    },
  });
  console.log(records);

  return records.map((r) => r.data.json());
}

export async function getContentComponentsIfPaid(contentId, authorDid) {
  const records = await web5.dwn.records.query({
    from: authorDid,
    message: {
      filter: {
        parentId: contentId,
        protocolPath: "content/components",
        protocol: `${baseUrl}/schemas/protocol`,
        schema: "contentComponent",
        dataFormat: "application/json",
      },
    },
  });
  console.log(records);

  return records;
}

export async function registerSubscription(contentId, authorDid, invoice) {
  var { record, status } = await web5.dwn.records.create({
    data: {
      authorDid,
      paymentRequest: invoice.paymentRequest,
      invoicePreimage: invoice.preimage,
    },
    message: {
      parentId: contentId,
      recipient: userDid,
      scheme: "subscription",
      protocol: `${baseUrl}/schemas/protocol`,
      protocolPath: "subscription",
      format: "application/json",
    },
  });

  await record.send(userDid);

  console.log(status);

  return status;
}
