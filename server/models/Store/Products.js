import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
  size: {
    type: String,
    enum: ["S", "M", "L", "XL"],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ProductSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  sizes: [SizeSchema],
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  materials: {
    type: [String],
    required: true,
  },
  imageUrl: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "kids", "unisex"],
    required: true,
    default: "unisex",
  },
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
