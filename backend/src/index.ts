import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRoutes from "./routes/product.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// MongoDB connection with more detailed error handling
mongoose.set("strictQuery", false); // Add this line for Mongoose 7+

mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error details:");
    console.error("Error name:", err.name);
    console.error("Error message:", err.message);
    console.error("Full error:", err);
    process.exit(1);
  });
