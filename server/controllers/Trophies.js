import TeamTrophies from "../models/Trophies.js";

export const addTrophies = async (req, res) => {
  try {
    const { teamName, year, trophies } = req.body;

    if (!teamName || !year || !trophies) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let team = await TeamTrophies.findOne({ teamName });

    if (team) {
      let yearRecord = team.records.find(record => record.year === year);
      if (yearRecord) {
        yearRecord.trophies = { ...yearRecord.trophies._doc, ...trophies };
      } else {
        team.records.push({
          year: year,
          trophies: trophies
        });
      }
    } else {
      team = new TeamTrophies({
        teamName: teamName,
        records: [
          {
            year: year,
            trophies: trophies
          }
        ]
      });
    }

    await team.save();
    res.status(200).json({ message: "Trophies added/updated successfully", team });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getAllTrophies = async (req, res) => {
    try {
      const data = await TeamTrophies.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

export const getTrophiesByCompetition = async(req,res) => {
  const {competition, year} = req.body;
  try{
    const team = await TeamTrophies.findOne(
      { "records.year": parseInt(year) },
      { "records.$": 1 }
    );

    if (!team) {
      return res.status(404).json({ message: "Year not found" });
    }

    const record = team.records[0];
    const competitionTrophies = record.trophies[competition];
    
    if (competitionTrophies === undefined) {
      return res.status(404).json({ message: "Competition not found" });
    }

    res.json({ year: record.year, competition, trophies: competitionTrophies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}