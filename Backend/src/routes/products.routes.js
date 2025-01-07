
import { Router } from "express";
import verifyAdmin from "../middlewares/admin.middleware.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.midlewares.js";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controllers.js";

const router = Router();

router.route("/add-product").post(
    verifyJWT,
    verifyAdmin,
    upload.fields([{
        name: "image",
        maxcount:1
    }]),
    addProduct);
router.route("/get-product/:id").get(getProduct);
router.route("/get-all-products").get(getAllProducts);
router.route("/update-product/:id").put(verifyJWT,verifyAdmin,updateProduct);
router.route("/delete-product/:id").delete(verifyJWT,verifyAdmin,deleteProduct);

export default router;
