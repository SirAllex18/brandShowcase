import mongoose from "mongoose";

const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
  },
});

const News = mongoose.model("News", NewsSchema);

export default News;
