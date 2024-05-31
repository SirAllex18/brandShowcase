import mongoose from "mongoose";
const Schema = mongoose.Schema;


const TrophySchema = new Schema({
  ChampionsLeague: { type: Number},
  EuropaLeague: { type: Number  },
  CampionatulRomaniei: { type: Number },
  CupaRomaniei: { type: Number  },
  Supercupe: { type: Number  },
  ConferenceLeague: { type: Number },
  MondialulCluburilor: { type: Number }
});


const YearlyRecordSchema = new Schema({
  year: { type: Number, required: true, unique: true },
  trophies: { type: TrophySchema, required: true }
});


const TeamTrophiesSchema = new Schema({
  teamName: { type: String, required: true },
  records: { type: [YearlyRecordSchema], required: true }
});

const TeamTrophies = mongoose.model('TeamTrophies', TeamTrophiesSchema);

export default TeamTrophies;