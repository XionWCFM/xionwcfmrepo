import { AES, enc } from "crypto-js";

const SECRET_KEY = "xionwcfm_un_important_key";

const encrypt = (data: Record<string, any>) => {
  const secretKey = SECRET_KEY;
  const encrypted = AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encrypted;
};

const decrypt = <T extends Record<string, any>>(encrypt: string): T => {
  const secretKey = SECRET_KEY;
  const decryptedBytes = AES.decrypt(encrypt, secretKey);
  const decryptedData = JSON.parse(decryptedBytes.toString(enc.Utf8));
  return decryptedData as T;
};

export { encrypt, decrypt };
