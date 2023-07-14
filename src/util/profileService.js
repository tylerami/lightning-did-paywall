import {
  displayImageSchema,
  profileSchema,
} from "../schemas/paywallProtocol.js";
import {
  flattenRecord,
  queryRecords,
  upsertRecord,
  userDid,
  web5,
} from "./dwnService.js";

export async function setProfileInWebNode({
  username,
  bio,
  lightningAddress,
  displayImage,
}) {
  const existingProfile = await getProfileFromWebNode(userDid);

  var displayImageRecord;
  if (displayImage) {
    const { record, status } = await upsertRecord({
      getExistingRecord: () =>
        getDisplayImageRecord({
          did: userDid,
          displayImageId: existingProfile?.displayImageId,
        }),
      data: displayImage,
      schema: displayImageSchema,
      protocolPath: "displayImage",
      dataFormat: "image/png",
      published: true,
    });
    displayImageRecord = record;
  }

  const response = await upsertRecord({
    getExistingRecord: getProfileRecord,
    data: {
      username,
      bio,
      lightningAddress,
      displayImageId: displayImageRecord?.id,
      did: userDid,
    },
    schema: profileSchema,
    protocolPath: "profile",
    published: true,
  });
  if (!response || !displayImage) return response;
}

export async function getProfileFromWebNode(did) {
  const profileRecord = await getProfileRecord(did);
  if (!profileRecord) return null;

  const profileData = await flattenRecord(profileRecord);

  const displayImageRecord = await getDisplayImageRecord({
    did,
    displayImageId: profileData?.displayImageId,
  });

  var displayImage;
  if (displayImageRecord) {

    try {
      displayImage = await displayImageRecord?.data?.blob();
    } catch (e) {
      console.log("error getting display image: ", e);
    }
  }

  return { ...profileData, displayImage };
}

async function getDisplayImageRecord({ did, displayImageId }) {
  if (!displayImageId) return null;

  const { record, status } = await web5.dwn.records.read({
    from: did,
    message: {
      recordId: displayImageId,
    },
  });
  console.log("display image record: ", record, status);
  return record;
}

async function getProfileRecord(did) {
  const records = await queryRecords({
    schema: profileSchema,
    from: did,
  });
  return records?.at(0);
}
