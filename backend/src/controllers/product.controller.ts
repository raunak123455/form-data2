import { Request, Response } from "express";
import Product from "../models/product.model";

export const getLatestProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne().sort({ createdAt: -1 });

    if (!product) {
      // Return these exact default values if no product exists
      return res.status(200).json({
        quantity: 2,
        price: 25,
        total: 40,
        profit: 11,
      });
    }

    // Return only the needed fields
    res.status(200).json({
      quantity: product.quantity,
      price: product.price,
      total: product.total,
      profit: product.profit,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product data", error });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

// export const updateProduct = async (req: Request, res: Response) => {
//   try {
//     const updatedProduct = await Product.findOneAndUpdate(
//       {}, // Update the most recent document
//       req.body,
//       { new: true, sort: { createdAt: -1 } }
//     );

//     if (!updatedProduct) {
//       // If no document exists, create a new one
//       const newProduct = new Product(req.body);
//       const savedProduct = await newProduct.save();
//       return res.status(201).json(savedProduct);
//     }

//     res.status(200).json(updatedProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating product", error });
//   }
// };
