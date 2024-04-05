
import dotenv from 'dotenv';
import Category from '../Models/category.schema.js';



dotenv.config();

export const createCategory = async (req, res) => {
    try {
      const { categoryName } = req.body; // Destructure fields from req.body
      const newCategory = new Category({
        categoryName,
        categoryImage: req.file.path
      });
      await newCategory.save();
      res.status(201).json({
        message: "Category created Successfully",
        data: newCategory,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error in Create Category" });
    }
  };
  
  export const getCategoryAll = async (req, res) => {
    try {
      const data = await Category.find();
      res.status(200).json({
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        error: "Error Fetching the Category",
      });
    }
  };

  export const getCategoryById = async (req, res) => {
    try {
      const id = req.params.id;
      const category = await Category.findOne({ categoryId: id });
      if (!category) {
        return res.status(404).json({
          message: "category not found",
        });
      }
      res.status(200).json({
        data: category,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Internal server Error",
      });
    }
  };
  export const updateCategoryById = async (req, res) => {
    const id = req.params.id;
    const { categoryName,categoryImage } =
      req.body;
    try {
      const category = await Category.findOneAndUpdate(
        { categoryId: id },
        { categoryName,categoryImage},
        { new: true }
      );
  
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Updated Sucessfully", data: category });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
  export const deleteCategoryById = async (req, res) => {
    const id = req.params.id;
    try {
      const deleteCategory = await Category.findOneAndDelete({ categoryId: id });
  
      if (!deleteCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
  
      res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };