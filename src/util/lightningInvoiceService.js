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

  const ln = new LightningAddress(lightningAddress);

  await ln.fetch();

  const invoice = await ln.requestInvoice({ satoshi: satsAmount });
  return invoice;
};

export const verifyInvoiceAndRegisterIfPaid = async ({
  contentId,
  authorDid,
  invoice,
}) => {
  if (!invoice) throw new Error("Missing invoice in invoice verification");
  if (!authorDid) throw new Error("Missing authorDid in invoice verification");
  if (!contentId) throw new Error("Missing contentId in invoice verification");

  const isPaid = await invoice.isPaid();
  if (isPaid) {
    console.log("Invoice is paid");
    const registerStatus = await registerSubscriptionInWebNode({
      authorDid,
      contentId,
      invoice,
    });
    console.log("Register status: ", registerStatus);
  }
  return isPaid;
};
