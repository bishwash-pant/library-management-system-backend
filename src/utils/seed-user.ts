import bcrytp from "bcrypt";
import { User } from "../modules/models/user-model";
import { createUser } from "../modules/user/user-controller";
import { UserInfoI } from "../common/interfaces/user-info";
import { hashString } from "./hashString";

export const seedSuperAdmin = async () => {
  const ADMIN_FULLNAME = "Super Admin";
  const ADMIN_EMAIL = "admin@superadmin.com";
  const ADMIN_PASSWORD = "Pass@123";
  const newAdmin = {
    fullName: ADMIN_FULLNAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    isAdmin: true,
  };
  try {
    console.log("Starting to Super User");
    const admin = await User.findOne({ email: ADMIN_EMAIL });
    if (admin) {
      console.log("Seeded Super User");
      return;
    }
    const salt = bcrytp.genSaltSync(10);
    const hashedPassword = hashString(newAdmin.password, salt);
    const superAdmin = createUser({
      ...newAdmin,
      salt: salt,
      password: hashedPassword,
    });
    console.log("Seeding Super User");
  } catch (e) {
    console.log(e);
  }
};
