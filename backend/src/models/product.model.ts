import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  quantity: number;
  price: number;
  total: number;
  profit: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    profit: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema, "form-data");
