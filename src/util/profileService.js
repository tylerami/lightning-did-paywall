import {
  displayImageSchema,
  profileSchema,
} from "../schemas/paywallProtocol.js";
import {
  flattenRecord,
  queryRecords,
  upsertRecord,
  userDid,
} from "./dwnService.js";

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
      did: userDid,
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

  console.log("profile record: ", await flattenRecord(profileRecord));
  if (!profileRecord) return null;

  const displayImageRecord = await getDisplayImageRecord(did);

  var displayImage;
  if (displayImageRecord) {
    console.log('display image record: ', displayImageRecord);
    console.log('display image record data: ', displayImageRecord.data);

    try {
      displayImage = await displayImageRecord?.data?.blob();
    } catch (e) {
      console.log("error getting display image: ", e);
    }
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
