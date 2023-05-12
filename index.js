import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import multer from "multer";
import "./config/config.js";
import { emailAvailable, register } from "./controller/userController.js";
import { encryptPassword } from "./middlewares/authMiddleware.js";
import { login } from "./controller/loginController.js";
import { logout } from "./controller/logoutController.js";
import { verifyJWTTokenMiddleware } from "./middlewares/verifyJWTTokenMiddleware.js";
import { cloudinaryUpload } from "./controller/cloudinaryUploadController.js";
import { multerCloudinaryOptionsController } from "./controller/multerCloudinaryOptionsController.js";
import { getProfileId } from "./controller/getProfileIdController.js";
import { getCategories, getProductsFromCategories, search, getProductDetails } from "./controller/groceryController.js";
import { mongoDbFilterQueryController } from "./controller/mongoDbFilterQueryController.js";

const app = express();

const PORT = process.env.PORT || 8989;

//middleware
app.use(cors({ origin: true, credentials: true })); // as damit https Cookie vom Fontend angenommen wird

const upload = multer();
const uploadCloudinary = multer(multerCloudinaryOptionsController);

app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// routes

app.post("/api/v1/login", encryptPassword, login);
// ! Vorsicht token ist wegen Testen auf 20 Tage gesetzt

app.get("/api/v1/availiable", emailAvailable);
app.post("/api/v1/register", encryptPassword, register);

// ! dann noch      verifyJWTTokenMiddleware  mit rein // as für die Route
app.post(
	"/api/v1/directupload",
	verifyJWTTokenMiddleware,
	uploadCloudinary.single("file"),
	cloudinaryUpload
);

app.get("/api/v1/filter", mongoDbFilterQueryController);

app.get("/api/v1/profile", verifyJWTTokenMiddleware, getProfileId);

app.get("/api/v1/logout", verifyJWTTokenMiddleware, logout);

app.get("/api/v1/verify", verifyJWTTokenMiddleware, (_, res) => {
	res.end();
});

app.get("/api/v1/search", search);
app.get("/api/v1/categories", getCategories);
app.get("/api/v1/products", getProductsFromCategories);
app.get("/api/v1/product/:id", getProductDetails)


app.listen(PORT, () => console.log("Server listening on port", PORT));
// test ob render jetzt geht
