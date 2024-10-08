import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotevn from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import multer from "multer";
import path from "path";
import { fileURLToPath} from "url";
import authRoutes from "../routes/auth.js";
import newsRoutes from "../routes/newsInsert.js"
import trophyRoutes from "../routes/trophies.js"
import gameRoutes from "../routes/matchDay.js"
import storeRoutes from "../routes/store.js"
import playersRoutes from "../routes/players.js"
import { FileInsert } from "../controllers/NewsInsert.js";
import { register } from "../controllers/auth.js";
import "../cronJob.js";


/*  CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotevn.config();

 const app = express();
 app.use(express.json());
 app.use(helmet());
 app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
 app.use(morgan("coomon"));
 app.use(bodyParser.json({ limit: "30mb",  extended: true }));
 app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
 const corsOptions = {
    origin: ['https://sovereignblues.vercel.app',
        'https://brand-showcase-git-main-sirallex18s-projects.vercel.app',
        'https://brand-showcase-a69my3l8v-sirallex18s-projects.vercel.app'], 
    optionsSuccessStatus: 200
  };
  
 app.use(cors(corsOptions));
 app.use("/assets", express.static(path.join(__dirname, '../../client/public/assets')));

 app.post("/auth/register", register);

 const publicServerAssetsPath = path.join(__dirname, 'public/server-assets');
 app.use("/server-assets", express.static(publicServerAssetsPath));
 /* FILE Storage */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/server-assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

/* Routes with files */ 
app.post('/fileInsert', upload.single('image'), FileInsert);

// ROUTES
app.use("/auth", authRoutes);
app.use("/files", newsRoutes);
app.use("/trophies", trophyRoutes )
app.use("/games", gameRoutes )
app.use("/store", storeRoutes)
app.use("/players", playersRoutes)

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('Database connected successfully.');
    })
    .catch((error) => console.log(`${error} did not connect`));


export default app;
