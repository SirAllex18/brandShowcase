import Player from "../models/Players.js";

export const getAllPlayers = async (req,res) => {
    try{
        const Players = await Player.find()
        res.status(200).json(Players)
    }catch(err){
        console.log(err)
    }
}

export const findPlayersByPosition = async (req,res) => {
    try {
      const { position } = req.body
      const Players = await Player.find({ position: position });
      res.status(200).json(Players)
    } catch (err) {
      console.error('Error finding position:', err.message);
    }
  };
  
  // Update a player's goals scored
 export const updatePlayerGoals = async (playerName, newGoals) => {
    try {
      const player = await Player.findOneAndUpdate(
        { name: playerName },
        { goalsScored: newGoals },
        { new: true }
      );
      console.log('Player updated:', player);
    } catch (err) {
      console.error('Error updating player:', err.message);
    }
  };
  