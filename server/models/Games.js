import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  referee: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  competitionLogo: {
    type: String,
    required: true
  },
  awayTeam: {
    type: Object,
    required: true
  },
  homeTeam: {
    type: Object, 
    required: true
  },
  score: {
    type: Object, 
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  teamStats: {
    type: Array, 
    required: true
  },
  probability: {
    type: String,
    required: false
  },
  commentary: {
    type: String,
    required: false
  }
});

const Game = mongoose.model('Game', GameSchema);
export default Game;