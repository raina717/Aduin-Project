import crypto from "crypto-js";

// Secret key
const secretKey = "aduinpasskey";

export function encryptId(id) {
  return crypto.AES.encrypt(id, secretKey).toString();
}

export function decryptId(encryptedId) {
  const decrypted = crypto.AES.decrypt(encryptedId, secretKey);

  if (decrypted) {
    try {
      console.log(decrypted);
      const str = decrypted.toString(crypto.enc.Utf8);
      if (str.length > 0) {
        return str;
      } else {
        return "error 1";
      }
    } catch (e) {
      return "error 2";
    }
  }
  return "error 3";
}
