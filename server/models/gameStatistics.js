import mongoose from "mongoose";

const GameSchema = new mongoose.Schema(
  {
    gameId: {
      type: Number,
      required: true,
      unique: true
    },
    result: {
      type: String,
      required: true
    }
  },
);

const StatisticsSchema = new mongoose.Schema(
  {
    results: {
      type: [GameSchema],
      required: true,
      default: []
    },
  },
);

const Stats = mongoose.model("Stats", StatisticsSchema);

export default Stats;
