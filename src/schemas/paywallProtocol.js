const baseUri = "https://lightningPaywall.app";

export const protocolUri = `${baseUri}/protocol`;

export const contentSchema = `${protocolUri}/content`;
export const metadataSchema = `${protocolUri}/metadata`;
export const audioSchema = `${protocolUri}/audio`;
export const subscriptionSchema = `${protocolUri}/subscription`;
export const paywallSchema = `${protocolUri}/paywall`;
export const profileSchema = `${protocolUri}/profile`;
export const profilePictureSchema = `${protocolUri}/profilePicture`;

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
      schema: audioSchema,
      dataFormats: ["audio/mp3"],
    },
    subscriber: {
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
  },
  structure: {
    profile: {
      $actions: [
        { who: "anyone", can: "read" },
        { who: "anyone", can: "write" },
      ],
      profilePicture: {
        $actions: [
          { who: "anyone", can: "read" },
          { who: "author", of: "profile", can: "write" },
        ],
      },
    },
    content: {
      $actions: [
        {
          who: "recipient",
          of: "content/subscriber",
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
            who: "recipient",
            of: "content/subscriber",
            can: "read",
          },
          {
            who: "author",
            of: "content",
            can: "write",
          },
        ],
      },
      subscription: {
        $actions: [
          {
            who: "author",
            of: "content",
            can: "write",
          },
          {
            who: "anyone",
            can: "read",
          },
        ],
      },
    },
  },
};
