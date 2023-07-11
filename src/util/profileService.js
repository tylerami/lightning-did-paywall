import {
  profilePictureSchema,
  profileSchema,
} from "../schemas/paywallProtocol.js";
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
    schema: profileSchema,
    protocolPath: "profile",
    published: true,
  });
  return response;
}

export async function setProfilePicture({ binaryImage }) {
  const response = await upsertRecord({
    getExistingRecord: getProfilePictureRecord,
    data: binaryImage,
    schema: profilePictureSchema,
    protocolPath: "profile/profilePicture",
    dataFormat: "image/png",
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
    schema: profilePictureSchema,
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
