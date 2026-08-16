const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Admin = require("../models/Admin");

dotenv.config();

const createOrUpdateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for admin seed");

    let admin = await Admin.findOne({
      username: "admin",
    });

    if (admin) {
      // Reset existing admin password
      admin.password = "admin123";
      await admin.save();

      console.log("✅ Existing Admin password reset successfully");
    } else {
      // Create new admin
      admin = await Admin.create({
        username: "admin",
        password: "admin123",
      });

      console.log("✅ Admin created successfully");
    }

    console.log("--------------------------------");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("--------------------------------");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log("❌ Error creating/updating admin:");
    console.log(error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

createOrUpdateAdmin();