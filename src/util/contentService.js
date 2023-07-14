import {
  audioSchema,
  contentSchema,
  metadataSchema,
  paywallSchema,
  protocolUri,
  subscriptionSchema,
} from "../schemas/paywallProtocol.js";
import { web5, userDid, flattenRecord, queryRecords } from "./dwnService.js";
import { getProfileFromWebNode } from "./profileService.js";

export async function publishContentToWebNode({
  title,
  description,
  body,
  audio,
  paywall,
}) {
  if (!body && !audio) throw new Error("body or audio are required");

  const timestamp = Date.now();
  const type = audio ? "audio" : "text";

  // create the content record
  const { record: contentRecord, status: contentStatus } =
    await web5.dwn.records.create({
      data: {
        title,
        description,
        body,
        timestamp,
        type,
        did: userDid,
      },
      message: {
        published: true,
        schema: contentSchema,
        protocol: protocolUri,
        protocolPath: "content",
        dataFormat: "application/json",
      },
    });

  if (contentStatus.code !== 202) {
    console.log(
      "Error creating content record, contentStatus: ",
      contentStatus.code
    );
    return false;
  } else {
    const { status: contentSendStatus } = await contentRecord.send(userDid);
    console.log("content send status: ", contentSendStatus);
  }

  // create the metadata record
  const { record: metadataRecord, status: metadataStatus } =
    await web5.dwn.records.create({
      data: {
        title,
        description,
        timestamp,
        type,
        did: userDid,
      },
      message: {
        published: true,
        contextId: contentRecord.id,
        parentId: contentRecord.id,
        schema: metadataSchema,
        protocol: protocolUri,
        protocolPath: "content/metadata",
        dataFormat: "application/json",
      },
    });


  if (metadataStatus.code !== 202) {
    console.log(
      "Error creating metadata record, metadataStatus: ",
      metadataStatus.code
    );
    return false;
  } else {
    const { status: metadataSendStatus } = await metadataRecord.send(userDid);
    console.log("metadata send status: ", metadataSendStatus);
  }

  const profile = await getProfileFromWebNode();

  if (paywall) {
    // create the paywall record
    const { record: paywallRecord, status: paywallStatus } =
      await web5.dwn.records.create({
        data: {
          satsAmount: paywall.satsAmount,
          lightningAddress:
            paywall.lightningAddress ?? profile?.lightningAddress,
          did: userDid,
        },
        message: {
          published: true,
          contextId: contentRecord.id,
          parentId: contentRecord.id,
          schema: paywallSchema,
          protocol: protocolUri,
          protocolPath: "content/paywall",
          dataFormat: "application/json",
        },
      });

    console.log("paywall record: ", paywallRecord, paywallStatus);

    if (paywallStatus.code !== 202) {
      console.log(
        "Error creating paywall record, paywallStatus: ",
        paywallStatus
      );
      return false;
    } else {
      const { status: paywallSendStatus } = await paywallRecord.send(userDid);
      console.log("paywall send status: ", paywallSendStatus);
    }
  }

  if (audio) {
    // create the audio record
    const { record: audioRecord, status: audioStatus } =
      await web5.dwn.records.create({
        data: audio,
        message: {
          published: true,
          contextId: contentRecord.id,
          parentId: contentRecord.id,
          schema: audioSchema,
          protocol: protocolUri,
          protocolPath: "content/audio",
          dataFormat: "audio/mp3",
        },
      });

    console.log("audio record: ", audioRecord, audioStatus);

    if (audioStatus.code !== 202) {
      console.log("Error creating audio record, audioStatus: ", audioStatus);
      return false;
    } else {
      const { status: audioSendStatus } = await audioRecord.send(userDid);
      console.log("audio send status: ", audioSendStatus);
    }
  }

  return true;
}

export async function getAllContentMetadataFromWebNode(authorDid) {
  const records = await queryRecords({
    schema: metadataSchema,
    from: authorDid,
  });

  if (!records) return null;

  return await Promise.all(
    records?.map(async (rec) => {
      const paywallRecord = await queryRecords({
        schema: paywallSchema,
        parentId: rec.parentId,
        from: authorDid,
      });
      return {
        ...(await flattenRecord(rec)),
        paywall: await flattenRecord(paywallRecord?.at(0)),
      };
    })
  );
}

async function getContentMetadataRecord({ contentId, authorDid }) {
  const records = await queryRecords({
    from: authorDid,
    schema: metadataSchema,
    parentId: contentId,
  });

  const record = records?.at(0);
  if (!record) {
    console.log("No metadata record found for contentId: ", contentId);
    return null;
  }

  return record;
}

export async function getContentMetadataFromWebNode({ contentId, authorDid }) {
  const record = await getContentMetadataRecord({ contentId, authorDid });
  if (!record) return null;

  const paywallRecord = await getPaywallRecord({ contentId, authorDid });

  return {
    ...(await flattenRecord(record)),
    paywall: paywallRecord,
  };
}

async function getPaywallRecord({ contentId, authorDid }) {
  const paywallRecord = await queryRecords({
    schema: paywallSchema,
    parentId: contentId,
    from: authorDid,
  });
  return await flattenRecord(paywallRecord?.at(0));
}

async function getContentRecord({ contentId, authorDid }) {
  var request = {
    message: {
      recordId: contentId,
    },
  };


  if (authorDid && authorDid !== userDid) {
    request.from = authorDid;
  }


  const { record: contentRecord, status: contentStatus } =
    await web5.dwn.records.read(request);

  if (contentStatus.code !== 200) {
    console.log(
      "Error reading content record, contentStatus: ",
      contentRecord,
      contentStatus
    );
    return null;
  }

  return contentRecord;
}

async function getAudioRecord({ contentId, authorDid }) {
  const records = await queryRecords({
    schema: audioSchema,
    parentId: contentId,
    from: authorDid,
  });

  console.log("audio records: ", records);

  const record = records?.at(0);
  if (!record) {
    console.log("No audio record found for contentId: ", contentId);
    return null;
  }

  return record;
}

export async function getContentFromWebNodeIfPaid({ contentId, authorDid }) {
  // Read the content record
  if (!contentId) {
    console.log("contentId is required");
    return null;
  }
  if (!authorDid) {
    console.log("authorDid is required");
    return null;
  }

  if (authorDid !== userDid) {
    const paywall = await getPaywallRecord({ contentId, authorDid });

    if (paywall) {
      const subscriptionRecord = await getSubscriptionRecord(contentId);
      if (!subscriptionRecord) return null;
    }
  }

  const contentRecord = await getContentRecord({ contentId, authorDid });
  if (!contentRecord) return null;

  // get the audio record
  const audioRecord = await getAudioRecord({ contentId, authorDid });

  return {
    ...(await flattenRecord(contentRecord)),
    audio: await audioRecord?.data?.blob(),
  };
}

export async function registerSubscriptionInWebNode({
  contentId,
  metadataId,
  authorDid,
  invoice,
}) {
  if (!invoice?.paymentRequest)
    throw new Error("Invoice paymentRequest is required");
  if (!invoice?.paymentHash) throw new Error("Invoice paymentHash is required");

  var { record, status } = await web5.dwn.records.create({
    data: {
      paymentRequest: invoice.paymentRequest,
      preimage: invoice.preimage,
      paymentHash: invoice.paymentHash,
      contentOwnerDid: authorDid,
      contentId: contentId,
    },
    message: {
      protocol: protocolUri,
      protocolPath: "subscription",
      recipient: userDid,
      schema: subscriptionSchema,
    },
  });
  console.log("register subscription status: ", record, status);

  if (status.code !== 202) {
    console.log("Error creating subscription record, status: ", status);
    return;
  }

  const { status: sendToUserStatus } = await record.send(userDid);
  console.log("sendToUserStatus: ", sendToUserStatus);

  return status;
}

async function getSubscriptionRecord(contentId) {
  const records = await queryRecords({
    schema: subscriptionSchema,
  });

  if (!records) return null;

  return (await Promise.all(records.map((r) => flattenRecord(r))))
    ?.filter((r) => r.contentId === contentId)
    ?.at(0);
}

export async function deleteContentFromWebNode(contentId) {
  if (!contentId) {
    console.log("contentId is required");
    return;
  }

  const metadataRecord = await getContentMetadataRecord({ contentId });
  if (!metadataRecord) {
    console.log("No metadata found for contentId: ", contentId);
    return;
  }
  metadataRecord.delete();

  const audioRecord = await getAudioRecord({ contentId });
  if (audioRecord) audioRecord.delete();

  const { record, status } = await web5.dwn.records.read({
    message: {
      recordId: contentId,
    },
  });

  if (status.code !== 200) {
    console.log("Error reading content record, status: ", record, status);
    return;
  }

  const { status: deleteStatus } = await record.delete();
  console.log("delete content status: ", deleteStatus);
}
