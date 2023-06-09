import { cloudinaryUpload } from "../controller/cloudinaryUploadController";
import { getBadges } from "../controller/getBadges";
import { getProfileId } from "../controller/getProfileIdController";
import { login } from "../controller/loginController";
import { multerCloudinaryOptionsController } from "../controller/multerCloudinaryOptionsController";
import { postUserInputDatenUpdaten } from "../controller/postUserInputDatenUpdaten";
import { verifyJWTTokenMiddleware } from "../middlewares/verifyJWTTokenMiddleware";
import { verifyToken } from "./token";
import { postWishlist, deleteWishlistItem, getWishlist } from "../controller/wishlistController";
import { getUserName } from "../controller/getUserName";
import { getCartTotalPrice } from "../controller/getCartTotalPrice";
import { addItemToCart } from "../controller/cartController";
import { getCartCheckout } from "../controller/getCartCheckout";
import { getDeals } from "../controller/getDeals";
import { getDealsMember } from "../controller/getDealsMember";
import { getOrders } from "../controller/getOrders";
import { getOrdersById } from "../controller/getOrdersById";
import { getCartRabattPreisGesOrder } from "../controller/getCartRabattPreisGesOrder";

login() // 581 User Login     // 404 User Not Found
verifyToken() // 582 Token konnte nicht verifiziert werden
verifyJWTTokenMiddleware() // 583 Token konnte nicht verifiziert werden
multerCloudinaryOptionsController() // 584 Fehler beim Hochladen: "bildGroesse" muss unter 1 MB sein
cloudinaryUpload() // 585 Fehler beim Hochladen cloudinaryUpload: "name" ist erforderlich, "imgUrl" muss eine gültige Uri sein
getProfileId() // 481 482  User mit ID: ${id} nicht gefunden
getBadges() // 586 
postUserInputDatenUpdaten() // 587 500 Fehler bei postUserInputDatenUpdaten
postWishlist() // 588  Fehler bei postWishlist
deleteWishlistItem() // 589
getWishlist() // 590
getUserName() // 591
getCartTotalPrice() // 592
addItemToCart() // 593  Fehler bei quantity zusammenrechnen
getCartCheckout() // 594  Fehler bei getCartCheckout
getDeals() // 595 Fehler bei getDeals
getDealsMember() // 596 Fehler bei getDealsMember
getOrders() // 597 Fehler bei getOrders
getOrdersById() // 598 Fehler bei getOrdersById
getCartRabattPreisGesOrder() // 599 Fehler bei getCartRabattPreisGesOrder