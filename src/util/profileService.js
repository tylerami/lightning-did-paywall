import {
  displayImageSchema,
  profileSchema,
} from "../schemas/paywallProtocol.js";
import { flattenRecord, queryRecords, upsertRecord } from "./dwnService.js";

export async function setProfileInWebNode({
  username,
  bio,
  lightningAddress,
  displayImage,
}) {
  const response = await upsertRecord({
    getExistingRecord: getProfileRecord,
    data: {
      username,
      bio,
      lightningAddress,
    },
    schema: profileSchema,
    protocolPath: "profile",
    published: true,
  });
  console.log("profile response: ", response);
  if (!response || !displayImage) return response;
  const profileRecord = response.record;

  const displayImageResponse = await upsertRecord({
    getExistingRecord: getDisplayImageRecord,
    data: displayImage,
    parentId: profileRecord?.id,
    schema: displayImageSchema,
    protocolPath: "profile/displayImage",
    dataFormat: "image/png",
    published: true,
  });
  return displayImageResponse;
}


export async function getProfileFromWebNode(did) {
  const profileRecord = await getProfileRecord(did);
  if (!profileRecord) return null;

  const displayImageRecord = await getDisplayImageRecord(did);

  var  displayImage;
  if (displayImageRecord) {
    displayImage =  await displayImageRecord?.data?.blob();
  }

  return { ...(await flattenRecord(profileRecord)), displayImage };
}

async function getDisplayImageRecord(did) {
  const records = await queryRecords({
    schema: displayImageSchema,
    dataFormat: "image/png",
    from: did,
  });
  return records?.at(0);
}

async function getProfileRecord(did) {
  const records = await queryRecords({
    schema: profileSchema,
    from: did,
  });
  return records?.at(0);
}
