import crypto from "crypto";

function genRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}

export function getHash(password, salt) {
  const hash = crypto.createHmac("sha3-512", salt);
  hash.update(password);
  const value = hash.digest("hex");
  return {
    passwordSalt: salt,
    passwordHash: value,
  };
}

export default function saltHashPassword(password) {
  const salt = genRandomString(16);
  const passwordData = getHash(password, salt);
  return passwordData;
}
