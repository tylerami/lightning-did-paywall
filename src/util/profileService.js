import { baseUrl, web5 } from "./dwnService";

export async function createProfile({ username, bio, lightningAddress }) {
  const profileRecord = await getProfilePicture();
  if (profileRecord) {
    const response = await profileRecord.update({
      data: {
        username: username ?? profileRecord.username,
        bio: bio ?? profileRecord.bio,
        lightningAddress: lightningAddress ?? profileRecord.lightningAddress,
      },
      message: {
        scheme: "profile",
        format: "application/json",
      },
    });
    console.log(response);
  } else {
    const response = await web5.dwn.records.create({
      data: { username, bio, lightningAddress },
      message: {
        scheme: "profile",
        format: "application/json",
      },
    });
    console.log(response);
  }
}

export async function createProfilePicture({ binaryImage }) {
  const profileRecord = await getProfilePicture();
  const request = {
    data: {
      binaryImage,
    },
    message: {
      protocol: `${baseUrl}/schemas/protocol`,
      protocolPath: "profile/profilePicture",
      scheme: "profilePicture",
      format: "application/json",
    },
  };

  if (profileRecord) {
    const response = await profileRecord.update(request);
    console.log(response);
  } else {
    const response = await web5.dwn.records.create(request);
    console.log(response);
  }
}

export async function publishContent({
  title,
  description,
  components,
  paywall,
}) {
  const { record, status } = await web5.dwn.records.create({
    data: {
      title,
      description,
    },
    message: {
      scheme: "content",
      protocol: `${baseUrl}/schemas/protocol`,
      protocolPath: "content",
      format: "application/json",
    },
  });

  const { paywallRecord, paywallStatus } = await web5.dwn.records.create({
    data: {
      satsAmount: paywall.satsAmount,
      lightningAddress: paywall.lightningAddress,
    },
    parentId: record.id,
    message: {
      scheme: "content/paywall",
      format: "application/json",
    },
  });

  components.forEach(async (component) => {
    const { componentRecord, componentStatus } = await web5.dwn.records.create({
      data: {
        binary: component.binary,
        dataType: component.dataType,
      },
      parentId: record.id,
      message: {
        scheme: "content/component",
        format: "image/jpeg",
      },
    });
  });
}

export async function getProfilePicture(did) {
  var query = {
    message: {
      filter: {
        protocol: `${baseUrl}/schemas/protocol`,
        schema: "profilePicture",
        dataFormat: "image/jpeg",
      },
    },
  };

  if (did) {
    query.from = did;
  }

  const profilePicture = (await web5.dwn.records.query(query)).first;
  return profilePicture;
}

export async function getProfileRecord(did) {
  var query = {
    message: {
      filter: {
        protocol: `${baseUrl}/schemas/protocol`,
        schema: "profile",
        dataFormat: "application/json",
      },
    },
  };

  if (did) {
    query.from = did;
  }

  const profile = (await web5.dwn.records.query(query)).first;
  return profile;
}
