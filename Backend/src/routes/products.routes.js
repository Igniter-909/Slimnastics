
import { Router } from "express";
import verifyAdmin from "../middlewares/admin.middleware";
import verifyJWT from "../middlewares/auth.middlewares";
import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product.controllers";

const router = Router();

router.route("/add-product").post(verifyJWT,verifyAdmin,addProduct);
router.route("/get-product/:id").get(getProduct);
router.route("/get-all-products").get(getAllProducts);
router.route("/update-product/:id").put(verifyJWT,verifyAdmin,updateProduct);
router.route("/delete-product/:id").delete(verifyJWT,verifyAdmin,deleteProduct);

export default router;