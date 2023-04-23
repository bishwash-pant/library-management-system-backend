import bcrypt from "bcrypt";
export const getSalt = () => bcrypt.genSaltSync(10);
