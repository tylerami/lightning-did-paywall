import {
  baseUrl,
  flattenRecord,
  queryRecords,
  upsertRecord,
} from "./dwnService.js";

export async function setProfile({ username, bio, lightningAddress }) {
  const response = await upsertRecord({
    getExistingRecord: getProfileRecord,
    data: {
      username,
      bio,
      lightningAddress,
    },
    schema: "profile",
    protocol: `${baseUrl}/protocol`,
    protocolPath: "profile",
    format: "application/json",
    published: true,
  });
  return response;
}

export async function setProfilePicture({ binaryImage }) {
  const response = await upsertRecord({
    getExistingRecord: getProfilePictureRecord,
    data: binaryImage,
    schema: "profilePicture",
    protocol: `${baseUrl}/protocol`,
    protocolPath: "profile/profilePicture",
    format: "image/png",
    published: true,
  });
  return response;
}

export async function getProfile(did) {
  const profileRecord = await getProfileRecord(did);
  return await flattenRecord(profileRecord);
}

export async function getProfilePicture(did) {
  const profilePictureRecord = await getProfilePictureRecord(did);
  const profilePicture = await profilePictureRecord?.data?.blob();

  return profilePicture;
}

async function getProfilePictureRecord(did) {
  const records = queryRecords({
    protocol: `${baseUrl}/protocol`,
    protocolPath: "profile/picture",
    schema: "profile",
    dataFormat: "application/json",
    from: did,
  });
  return records?.at(0);
}

async function getProfileRecord(did) {
  const records = await queryRecords({
    protocol: `${baseUrl}/protocol`,
    schema: "profile",
    dataFormat: "application/json",
    from: did,
  });
  return records?.at(0);
}
