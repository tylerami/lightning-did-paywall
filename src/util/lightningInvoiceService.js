import { LightningAddress } from "alby-tools";


export const createInvoice = async (statsAmount, address) => {
    const ln = new LightningAddress('lightningpaywall@getalby.com');

    await ln.fetch();

    const invoice = await ln.requestInvoice({satoshi: statsAmount});
    console.log(JSON.stringify(invoice));
    return invoice;
}

export const verifiyInvoice =  async (invoice)  => {
   return await invoice.isPaid();
}
