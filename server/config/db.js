const mongoose = require("mongoose");
require("dotenv").config();

// Log the MongoDB connection URL to verify it's loaded correctly
console.log("MONGODB_URL:", process.env.MONGODB_URL);

// Ensure MONGODB_URL is defined
if (!process.env.MONGODB_URL) {
  console.error("Error: MONGODB_URL is not set in the environment variables");
  process.exit(1); // Exit the process with an error code
}

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: "Beauty_Service", // Specify the database name
    useNewUrlParser: true, // Use the new connection string parser
    useUnifiedTopology: true, // Use the new server discovery engine
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Listen to the "open" event only after a successful connection
    mongoose.connection.once("open", () => {
      console.log("MongoDB connection is open");
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1); // Exit the process if the connection fails
  });
