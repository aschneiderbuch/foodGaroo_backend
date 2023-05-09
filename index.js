import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import "./config/config.js";

const app = express();

const PORT = process.env.PORT || 8989;

//middleware
app.use(cors());


const upload = multer() 
// app.use(multer());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.listen(PORT, () => console.log("Server listening on port", PORT));
