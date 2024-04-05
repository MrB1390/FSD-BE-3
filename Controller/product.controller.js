import dotenv from "dotenv";
import Product from "../Models/product.schema.js";

dotenv.config();

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      productStatus,
      categoryId,
    } = req.body; // Destructure fields from req.body
    const newProduct = new Product({
      productName,
      productDescription,
      productPrice,
      productStatus,
      image: req.file.path,
      categoryId,
    });
    await newProduct.save();
    res.status(201).json({
      message: "Product created Successfully",
      data: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in Create Product" });
  }
};

export const getProductAll = async (req, res) => {
  try {
    const data = await Product.find();
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Error Fetching the Product",
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ productId: id });
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};
export const updateProductById = async (req, res) => {
  const id = req.params.id;
  const { productName, productDescription, productPrice, productImage } =
    req.body;
  try {
    const product = await Product.findOneAndUpdate(
      { productId: id },
      { productName, productDescription, productImage, productPrice },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Updated Sucessfully", data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteProductById = async (req, res) => {
  const id = req.params.id;
  try {
    const deleteProduct = await Product.findOneAndDelete({ productId: id });

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProductStatusById = async (req, res) => {
  const id = req.params.id;
  const { productStatus } = req.body; // Assuming the new role is sent in the request body

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { productId: id },
      { productStatus },
      { new: true } // This option ensures that the updated user is returned
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product Status updated successfully", data: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
