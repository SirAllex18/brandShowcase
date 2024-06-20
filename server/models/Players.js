import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  kitNumber: {
    type: Number,
    required: true,
    min: 1,
    max: 99,
  },
  age: {
    type: Number,
    required: true,
    min: 16,
    max: 50,
  },
  matchesPlayed: {
    type: Number,
    required: true,
    min: 0,
  },
  goalsScored: {
    type: Number,
    required: true,
    min: 0,
  },
  position: {
    type: String,
    enum: ["Portar", "Fundas", "Mijlocas", "Atacant"]
  },
  nationality: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Player = mongoose.model('Player', PlayerSchema);
export default Player;
