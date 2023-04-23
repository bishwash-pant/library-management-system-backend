import bcrypt from "bcrypt";

export function hashString(str: string, salt: string) {
  try {
    const hash = bcrypt.hashSync(str, salt);
    return hash;
  } catch (e) {
    return e;
  }
}
