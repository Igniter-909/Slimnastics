import { Router } from "express";
import verifyJWT from "../middlewares/auth.middlewares.js";
import { addComment, deleteComment, getComment, updateComment } from "../controllers/comment.controllers.js";

const router = Router();

router.route("/add-comment").post(verifyJWT,addComment);
router.route("/update-comment/:commentId").put(verifyJWT,updateComment);
router.route("/delete-comment/:id").delete(verifyJWT,deleteComment);
router.route("/get-all-comment/:productId").get(getComment);

export default router;