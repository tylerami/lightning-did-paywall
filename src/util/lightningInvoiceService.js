import { LightningAddress } from "alby-tools";


export const createInvoice = async (satsAmount, address) => {
    const ln = new LightningAddress('lightningpaywall@getalby.com');

    await ln.fetch();

    const invoice = await ln.requestInvoice({satoshi: satsAmount});
    console.log(JSON.stringify(invoice));
    return invoice;
}

export const verifyInvoice =  async (invoice)  => {
   return await invoice.isPaid();
}
