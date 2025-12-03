import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Let Mongoose hash the password automatically
    const admin = await User.create({
      name: "Admin",
      email: "admin@gmail.com",
      password: "admin123", // <--- DO NOT HASH
      isAdmin: true,
      isActive: true,
    });

    console.log("✅ Admin created:", admin.email);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
