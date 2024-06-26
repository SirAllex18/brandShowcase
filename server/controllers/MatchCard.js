import Counter from "../models/Counter.js";
import Game from "../models/Games.js";

export const getMatchDay = async (req, res) => {
  try{
    const counter = await Counter.findOne();
    if (!counter) {
      return res.status(404).send("Counter document not found");
    }
    const start = counter.start - 1;
    const end = counter.end - 1;

    const getMatches = await Game.find()
    const reverseMatches = getMatches.reverse()
    const getActualMatches = reverseMatches.slice(start, end)
  
    res.status(200).json(getActualMatches);
  } catch(err){
    res.status(500).json({ error: err.message })
  }
}