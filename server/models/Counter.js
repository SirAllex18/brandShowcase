import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CounterSchema = new Schema({
  start: {
    type: Number,
    required: true,
  },
  end: {
    type: Number,
    required: true,
  }
});

const News = mongoose.model("Counter", CounterSchema);

export default News;
