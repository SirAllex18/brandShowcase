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
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js"

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
 app.use(cors())
 app.use("/assets", express.static(path.join(__dirname, 'public/assets')));


 /* FILE Storage */
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

/* Routes with files */ 
app.post("/auth/register", upload.single("picture"), register)

// ROUTES
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));