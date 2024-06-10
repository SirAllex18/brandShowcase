import Product from "../models/Store/Products.js";
import Category from "../models/Store/Category.js";
import mongoose from "mongoose";

// Products Create & Read
export const createProduct = async (req, res) => {
  try {
    const { categoryId, name, sizes, description, price, materials, imageUrl } =
      req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = new Product({
      category: categoryId,
      name,
      sizes,
      description,
      price,
      materials,
      imageUrl,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.find({ category: categoryId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Wrong ID category");
  }
};

export const getProductsBySubCategory = async (req, res) => {
  try {
    const { categoryName, subCategory } = req.body;
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      throw new Error("Category provided not found");
    } else {
      console.log(category._id);
    }
   

    const products = await Product.find({
      category: category._id,
      subCategory: subCategory,
    });

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Wrong ID category");
  }
};

// Create Category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories)
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUniqueSubCategories = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const category = await Category.findOne({ name: categoryName });

    if (!category) {
      throw new Error("Category provided not found");
    }

    const categoryId = category._id;

    const subCategories = await Product.aggregate([
      { $match: { category: new mongoose.Types.ObjectId(categoryId) } },
      { $group: { _id: "$subCategory" } },
      { $project: { _id: 0, subCategory: "$_id" } },
    ]);

    res.status(200).json(subCategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("Error:", err.message);
  }
};
