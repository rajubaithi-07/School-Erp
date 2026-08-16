const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

// ==========================================
// SERVER CONFIGURATION
// ==========================================

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL;

// ==========================================
// START SERVER
// ==========================================

const startServer = async () => {
  try {
    // --------------------------------------
    // CHECK MONGODB CONNECTION STRING
    // --------------------------------------

    if (!MONGO_URI) {
      throw new Error(
        "MongoDB connection string is missing. Please check your .env file."
      );
    }

    // --------------------------------------
    // CONNECT TO MONGODB
    // --------------------------------------

    await mongoose.connect(MONGO_URI);

    console.log("=================================");
    console.log("MongoDB Connected Successfully");
    console.log("=================================");

    // --------------------------------------
    // START EXPRESS SERVER
    // --------------------------------------

    app.listen(PORT, () => {
      console.log("=================================");
      console.log("School ERP Server Running");
      console.log(`http://localhost:${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("=================================");
    console.error("SERVER START ERROR");
    console.error("=================================");
    console.error(error.message);

    process.exit(1);
  }
};

// ==========================================
// START APPLICATION
// ==========================================

startServer();