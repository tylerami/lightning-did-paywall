import { Web5 } from "@tbd54566975/web5";
import paywallProtocol from "../schemas/paywallProtocol.json";

// Create a new instance of Web5
export const { web5, did: userDid } = await Web5.connect();

export const baseUrl = "https://lightningPaywall.app";

export function getDid() {
  return userDid;
}

// Function to configure a protocol
async function configureProtocol() {
  const { protocols, status } = await web5.dwn.protocols.query({
    message: {
      filter: {
        protocol: `${baseUrl}/schemas/protocol`,
      },
    },
  });

  if (status.code !== 200) {
    alert("Failed to query protocols. check console");
    console.error("Failed to query protocols", status);

    return;
  }

  // protocol already exists
  if (protocols.length > 0) {
    console.log("protocol already exists");
    return;
  }

  const { status: configureStatus } = await web5.dwn.protocols.configure({
    message: {
      definition: paywallProtocol,
    },
  });
  console.log("configure protocol status", configureStatus);
}

configureProtocol();
