const app = require("./app");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

const MONGO_URI =
  process.env.MONGO_URI ||
  process.env.MONGODB_URI ||
  process.env.DATABASE_URL;

// ==========================================
// MONGODB CONNECTION
// ==========================================

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (!MONGO_URI) {
    throw new Error(
      "MongoDB connection string is missing. Please check MONGO_URI."
    );
  }

  await mongoose.connect(MONGO_URI);

  isConnected = true;

  console.log("=================================");
  console.log("MongoDB Connected Successfully");
  console.log("=================================");
};

// ==========================================
// VERCEL / PRODUCTION
// ==========================================

// Connect to MongoDB before handling requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// Export Express app for Vercel
module.exports = app;

// ==========================================
// LOCAL DEVELOPMENT
// ==========================================

if (require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log("=================================");
        console.log("School ERP Server Running");
        console.log(`http://localhost:${PORT}`);
        console.log("=================================");
      });
    })
    .catch((error) => {
      console.error("=================================");
      console.error("SERVER START ERROR");
      console.error("=================================");
      console.error(error.message);
      process.exit(1);
    });
}