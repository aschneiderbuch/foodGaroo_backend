import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import "./config/config.js";
import { emailAvailable, register } from "./controller/userController.js";
import { encryptPassword } from "./middlewares/authMiddleware.js";
import { login } from "./controller/loginController.js";
import { deleteCookieMiddleware } from "./middlewares/deleteCookieMiddleware.js";
import { logout } from "./controller/logoutController.js";
import { verifyJWTTokenMiddleware } from "./middlewares/verifyJWTTokenMiddleware.js";
import { cloudinaryUpload } from "./controller/cloudinaryUploadController.js";
import { multerCloudinaryOptionsController } from "./controller/multerCloudinaryOptionsController.js";

const app = express();

const PORT = process.env.PORT || 8989;

//middleware
app.use(cors({ origin: true, credentials: true })); // as damit https Cookie vom Fontend angenommen wird

const upload = multer();
const uploadCloudinary = multer( multerCloudinaryOptionsController)

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.post("/api/v1/login", encryptPassword, login); // as encryptPassword müsste von Lando von der Regestrierung kommen
// ! Vorsicht token ist wegen Testen auf 20 Tage gesetzt

// verifyJWTTokenMiddleware    // as für die Routen

app.get("/api/v1/availiable", emailAvailable);
app.post("/api/v1/register", encryptPassword, register);

app.post('/directupload', verifyJWTTokenMiddleware, uploadCloudinary.single('file'), cloudinaryUpload); // as für cloudinaryUpload

app.get("/", deleteCookieMiddleware, logout); // as für logout

app.listen(PORT, () => console.log("Server listening on port", PORT));
// test ob render jetzt geht
