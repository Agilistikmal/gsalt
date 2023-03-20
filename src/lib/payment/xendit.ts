import Xendit from "xendit-node";
import qrcode from "qrcode";

const x = new Xendit({
  secretKey: process.env.XENDIT_SECRET_KEY as string,
});

const qr = new x.QrCode({});

export const createQris = async (externalID: string, amount: number) => {
  const qris = await qr.createCode({
    callbackURL: "https://safatanc.com/api/callback",
    externalID: externalID,
    // @ts-ignore
    type: "DYNAMIC",
    amount: amount,
  });
  return qris;
};

export const getQris = async (externalID: string) => {
  const qris = await qr.getCode({
    externalID: externalID,
  });
  return qris;
};

export const generateQrisImgPath = (qris: any) => {
  qrcode.toFile(`./src/temp/${qris.external_id}.jpg`, qris.qr_string, (err) => {
    if (err) throw err;
  });
  return `./src/temp/${qris.external_id}.jpg`;
};
