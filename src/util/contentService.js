import {
  baseUrl,
  web5,
  userDid,
  flattenRecord,
  queryRecords,
} from "./dwnService.js";
import { getProfile } from "./profileService.js";

// publishContent({
//   title: "My first content",
//   description: "This is my first content",
//   body: "This is the body of my first content",
//   paywall: {
//     satsAmount: 100,
//     lightningAddress: null
//   }

// });

export async function publishContent({
  title,
  description,
  body,
  audio,
  paywall,
}) {
  if (!body && !audio) throw new Error("body or audio are required");

  // create the content record
  const { record: contentRecord, status: contentStatus } =
    await web5.dwn.records.create({
      data: {
        title,
        description,
        body,
      },
      message: {
        published: false,
        schema: "content",
        protocol: `${baseUrl}/protocol`,
        protocolPath: "content",
        format: "application/json",
      },
    });

  console.log(contentRecord, contentStatus);

  // create the metadata record
  const { record: metadataRecord, status: metadataStatus } =
    await web5.dwn.records.create({
      data: {
        title,
        description,
        body,
      },
      message: {
        published: true,
        parentId: contentRecord.id,
        schema: "metadata",
        protocol: `${baseUrl}/protocol`,
        protocolPath: "content/metadata",
        format: "application/json",
      },
    });

  console.log(metadataRecord, metadataStatus);

  const profile = await getProfile();

  // create the paywall record
  const { record: paywallRecord, status: paywallStatus } =
    await web5.dwn.records.create({
      data: {
        satsAmount: paywall.satsAmount,
        lightningAddress: paywall.lightningAddress ?? profile.lightningAddress,
      },
      message: {
        published: true,
        parentId: contentRecord.id,
        schema: "paywall",
        protocol: `${baseUrl}/protocol`,
        protocolPath: "content/paywall",
        format: "application/json",
      },
    });

  console.log(paywallRecord, paywallStatus);

  // create the audio record
  const { record: audioRecord, status: audioStatus } =
    await web5.dwn.records.create({
      data: audio,
      message: {
        published: false,
        parentId: contentRecord.id,
        schema: "audio",
        protocol: `${baseUrl}/protocol`,
        protocolPath: "content/audio",
        format: "audio/mp3",
      },
    });

  console.log(audioRecord, audioStatus);
}

export async function getAllContentMetadata(authorDid) {
  const records = await web5.dwn.records.query({
    from: authorDid,
    message: {
      filter: {
        protocolPath: "content/metadata",
        protocol: `${baseUrl}/protocol`,
        schema: "metadata",
        dataFormat: "application/json",
      },
    },
  });
  console.log(records);

  return Promise.all(records.map(async (rec) => await flattenRecord(rec)));
}

export async function getContentIfPaid(contentId, authorDid) {
  // Read the content record
  const contentRecord = await web5.dwn.records.read({
    from: authorDid,
    message: {
      recordId: contentId,
    },
  });

  // get the audio record
  const audioRecords = await queryRecords({
    protocol: `${baseUrl}/protocol`,
    protocolPath: "content/audio",
    schema: "audio",
    parentId: contentId,
    from: authorDid,
  });

  const audioBinary = await flattenRecord(audioRecords?.at(0));
  return {
    ...(await flattenRecord(contentRecord)),
    audioBinary,
  };
}

export async function registerSubscription({ contentId, authorDid, invoice }) {
  if (!invoice?.paymentRequest)
    throw new Error("Invoice paymentRequest is required");
  if (!invoice?.preimage) throw new Error("Invoice preimage is required");

  var { record, status } = await web5.dwn.records.create({
    data: {
      paymentRequest: invoice.paymentRequest,
      invoicePreimage: invoice.preimage,
    },
    author: authorDid,
    message: {
      parentId: contentId,
      recipient: userDid,
      schema: "subscription",
      protocol: `${baseUrl}/protocol`,
      protocolPath: "subscription",
      format: "application/json",
    },
  });

  const { status: receiptStatus } = await record.send(userDid);

  console.log(status);
  console.log(receiptStatus);

  return status;
}
