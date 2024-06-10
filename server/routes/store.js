import express from "express";
import {
  createProduct,
  getProductsByCategory,
  createCategory,
  getAllCategories,
  getProductsBySubCategory,
  getUniqueSubCategories
} from "../controllers/Store.js";

const router = express.Router();

router.post("/categories", createCategory);
router.get("/categories", getAllCategories);

router.get("/products/:categoryId", getProductsByCategory);
router.post("/products", createProduct);
router.post("/products/subCategory", getProductsBySubCategory)
router.post("/products/uniqueCategory", getUniqueSubCategories)


export default router;
