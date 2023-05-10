import { cloudinaryUpload } from "../controller/cloudinaryUploadController";
import { login } from "../controller/loginController";
import { multerCloudinaryOptionsController } from "../controller/multerCloudinaryOptionsController";
import { verifyToken } from "./token";

login() // 581 User Login     // 404 User Not Found
verifyToken() // 582 Token konnte nicht verifiziert werden
verifyJWTTokenMiddleware() // 583 Token konnte nicht verifiziert werden
multerCloudinaryOptionsController() // 584 Fehler beim Hochladen: "bildGroesse" muss unter 1 MB sein
cloudinaryUpload() // 585 Fehler beim Hochladen cloudinaryUpload: "name" ist erforderlich, "imgUrl" muss eine gültige Uri sein
