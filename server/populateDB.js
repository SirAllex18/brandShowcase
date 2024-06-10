import mongoose from 'mongoose';
import TeamTrophies from './models/Trophies.js';

// mongoose.connect('mongodb+srv://SirAllex25:NewDawn25@cluster0.heg6n3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Failed to connect to MongoDB', err);
// });

// const populateTrophies = async () => {
//   try {

//     let trophies = {
//       ChampionsLeague: 0,
//       EuropaLeague: 0,
//       CampionatulRomaniei: 0,
//       CupaRomaniei: 0,
//       Supercupe: 0,
//       ConferenceLeague: 0,
//       MondialulCluburilor: 0,
//     };

//     const records = [];

//     for (let year = 1990; year <= 2024; year++) {
     
//       Object.keys(trophies).forEach(trophy => {
//         if (Math.random() > 0.5) { 
//           trophies[trophy]++;
//         }
//       });

//       records.push({
//         year,
//         trophies: { ...trophies },
//       });
//     }

//     const newTeam = new TeamTrophies({
//       teamName: 'Steaua Bucuresti',
//       records,
//     });

//     await newTeam.save();
//     console.log('Team trophies added successfully');

//     mongoose.connection.close();
//   } catch (err) {
//     console.error('Error populating trophies:', err);
//     mongoose.connection.close();
//   }
// };

// populateTrophies();

import Category from './models/Store/Category.js';
import Product from './models/Store/Products.js';

const mongoURI = 'mongodb+srv://SirAllex25:NewDawn25@cluster0.heg6n3e.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const createProduct = async (categoryId, subCategory, name, sizes, description, price, materials, imageUrl) => {
  try {
    const newProduct = new Product({
      category: categoryId,
      subCategory,
      name,
      sizes,
      description,
      price,
      materials,
      imageUrl,
     
    });

    const savedProduct = await newProduct.save();
    console.log('Product created:', savedProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
  }
};

const createCategory = async (name, subCategories = []) => {
  try {
    const newCategory = new Category({ name, subCategories });
    const savedCategory = await newCategory.save();
    console.log('Category created:', savedCategory);
    return savedCategory;
  } catch (err) {
    console.error('Error creating category:', err.message);
  }
};


const runScript = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
    
    await createProduct(
      '6664c1e988fa9d291026d69f',
      "FootballsLimited",
      'LaDecima',
      [
        { size: 'S', quantity: 2 },
        { size: 'M', quantity: 4 },
        { size: 'L', quantity: 1 },
        { size: 'XL', quantity: 14 }
      ],
      'Mens Jacket made from 100% cotton.',
      55,
      ['Cotton', 'Polyester'],
      'https://example.com/images/white_tshirt.jpg',
    );
  
   // await createCategory('WarmUp');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};

runScript();