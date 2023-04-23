import mongoose from "mongoose";
import { seedSuperAdmin } from "./utils/seed-user";
export async function connectToDatabase() {
  const options = {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
  };
  try {
    mongoose.connect(process.env.DB_URL, options);
    console.log("Connected to MongoDB database");
    setTimeout(seedSuperAdmin, 2000);
  } catch (e) {
    console.log("Error connecting to MongoDB database");
  }
}
