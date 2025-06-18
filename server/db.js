import mongoose from "mongoose";

//Handles connection to the mongo database

const mongoose_connector = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit process if DB connection fails
  }
};

export default mongoose_connector;
