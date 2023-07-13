import { LightningAddress } from "alby-tools";
import { getProfileFromWebNode } from "./profileService.js";
import { registerSubscriptionInWebNode } from "./contentService.js";

export const createInvoice = async ({ satsAmount, lightningAddress }) => {
  if (!lightningAddress) {
    const profile = await getProfileFromWebNode();
    lightningAddress = profile.lightningAddress;
  }

  if (!lightningAddress) throw new Error("Missing address in invoice creation");
  if (!satsAmount) throw new Error("Missing satsAmount in invoice creation");
  console.log("Creating invoice with params: ", [satsAmount, lightningAddress]);
  const ln = new LightningAddress(lightningAddress);

  await ln.fetch();

  var invoice;
  try {
    invoice = await ln.requestInvoice({ satoshi: satsAmount });
  } catch (e) {
    console.log("Error creating invoice: ", e);
    const profile = await getProfileFromWebNode();

    return await createInvoice({ satsAmount, lightningAddress: profile.lightningAddress });
  }

  return invoice;
};

export const verifyInvoiceAndRegisterIfPaid = async ({
  metadataId,
  authorDid,
  invoice,
}) => {
  if (!invoice) throw new Error("Missing invoice in invoice verification");
  if (!authorDid) throw new Error("Missing authorDid in invoice verification");
  if (!metadataId)
    throw new Error("Missing metadataId in invoice verification");

  const isPaid = await invoice.isPaid();
  if (isPaid) {
    console.log("Invoice is paid");
    const registerStatus = await registerSubscriptionInWebNode({
      authorDid,
      metadataId,
      invoice,
    });
    console.log("Register status: ", registerStatus);
  }
  return isPaid;
};
