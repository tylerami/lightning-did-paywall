const baseUri = "https://lightningPaywall.app";

export const protocolUri = `${baseUri}/protocolTest501`; //460

export const contentSchema = `${baseUri}/content`;
export const metadataSchema = `${baseUri}/metadata`;
export const audioSchema = `${baseUri}/audio`;
export const subscriptionSchema = `${baseUri}/subscription`;
export const paywallSchema = `${baseUri}/paywall`;
export const profileSchema = `${baseUri}/profile`;
export const displayImageSchema = `${baseUri}/displayImage`;

export const paywallProtocol = {
  protocol: protocolUri,
  types: {
    content: {
      schema: contentSchema,
      dataFormats: ["application/json"],
    },
    metadata: {
      schema: metadataSchema,
      dataFormats: ["application/json"],
    },
    audio: {
      dataFormats: ["audio/mp3"],
    },
    subscription: {
      schema: subscriptionSchema,
      dataFormats: ["application/json"],
    },
    paywall: {
      schema: paywallSchema,
      dataFormats: ["application/json"],
    },
    profile: {
      schema: profileSchema,
      dataFormats: ["application/json"],
    },
    displayImage: {
      schema: displayImageSchema,
      dataFormats: ["image/png", "image/jpeg"],
    },
  },
  structure: {
    profile: {
      $actions: [
        { who: "anyone", can: "read" },
        { who: "anyone", can: "write" },
      ],
      displayImage: {
        $actions: [
          { who: "anyone", can: "read" },
          { who: "author", of: "profile", can: "write" },
        ],
      },
    },
    content: {
      $actions: [
        {
          who: "anyone",
          can: "read",
        },
        {
          who: "anyone",
          can: "write",
        },
      ],
      metadata: {
        $actions: [
          { who: "anyone", can: "read" },
          { who: "author", of: "content", can: "write" },
        ],
      },
      paywall: {
        $actions: [
          { who: "anyone", can: "read" },
          { who: "author", of: "content", can: "write" },
        ],
      },
      audio: {
        $actions: [
          {
            who: "anyone",
            can: "read",
          },
          {
            who: "author",
            of: "content",
            can: "write",
          },
        ],
      },
    },
    subscription: {
      $actions: [
        { who: "anyone", can: "read" },
        { who: "anyone", can: "write" },
      ],
    },
  },
};
