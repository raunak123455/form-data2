import express from "express";
import {
  getLatestProduct,
  createProduct,
  // updateProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/latest", getLatestProduct);
router.post("/", createProduct);
// router.put("/update", updateProduct);

export default router;
