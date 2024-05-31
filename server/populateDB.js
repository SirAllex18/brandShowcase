import mongoose from 'mongoose';
import TeamTrophies from './models/Trophies.js';

mongoose.connect('mongodb+srv://SirAllex25:NewDawn25@cluster0.heg6n3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});

const populateTrophies = async () => {
  try {

    let trophies = {
      ChampionsLeague: 0,
      EuropaLeague: 0,
      CampionatulRomaniei: 0,
      CupaRomaniei: 0,
      Supercupe: 0,
      ConferenceLeague: 0,
      MondialulCluburilor: 0,
    };

    const records = [];

    for (let year = 1990; year <= 2024; year++) {
     
      Object.keys(trophies).forEach(trophy => {
        if (Math.random() > 0.5) { 
          trophies[trophy]++;
        }
      });

      records.push({
        year,
        trophies: { ...trophies },
      });
    }

    const newTeam = new TeamTrophies({
      teamName: 'Steaua Bucuresti',
      records,
    });

    await newTeam.save();
    console.log('Team trophies added successfully');

    mongoose.connection.close();
  } catch (err) {
    console.error('Error populating trophies:', err);
    mongoose.connection.close();
  }
};

populateTrophies();