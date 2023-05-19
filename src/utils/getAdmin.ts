import { User } from "../modules/models/user-model";

export async function getAdmin(): Promise<any> {
  try {
    const admin = await User.findOne({ email: "admin@superadmin.com" });
    console.log("get admin", admin);

    if (admin) return Promise.resolve(admin._id);
    return Promise.reject("Admin not found");
  } catch (e) {
    console.log("admin not found");

    return Promise.reject("Admin not found");
  }
}
