import { Router } from "express";
import { loginUser, 
    logoutUser, 
    registerUser,
    refreshAccessToken, 
    getUserProfile, 
    updateAccountDetails, 
    updateAvatar, deleteAccount, 
    viewPlan, 
    addPlan,
    getAllUsers,
    addToCart,
    removeFromCart,
    attendanceData,
    getProgressStats,
    getTrainersData
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.midlewares.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import verifyAdmin from "../middlewares/admin.middleware.js";
import { addBlog,deleteBlog,getAllBlogs } from "../controllers/blog.controller.js";

const router = Router();

router.route("/register").post(
    upload.fields([{
        name: "avatar",
        maxcount: 1
    }]),
    registerUser
);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT,logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/current-user").get(verifyJWT,getUserProfile);
router.route("/update-profile").post(verifyJWT, updateAccountDetails);
router.route("/allUsers").get(getAllUsers)
router.route("/update-avatar").post(
    verifyJWT, 
    upload.fields([{
        name:"avatar",
        maxcount: 1
    }]),
    updateAvatar
);
router.route("/delete-profile").post(verifyJWT, deleteAccount);
router.route("/view-plan").get(verifyJWT, viewPlan)
router.route("/add-plan").post(verifyJWT,addPlan);
router.route("/addToCart").post(verifyJWT,addToCart);
router.route("/removeFromCart/:id").delete(verifyJWT,removeFromCart);
router.route("/attendanceData").get(verifyJWT,attendanceData);
router.route("/progress").get(verifyJWT,getProgressStats);
router.route("/addBlog").post(verifyJWT,
    upload.fields([{
        name:"thumbnail",
        maxcount:1
    }]),
    addBlog);
router.route("/getAllBlogs").get(getAllBlogs)
router.route("/deleteBlog/:id").delete(verifyJWT,verifyAdmin,deleteBlog);
router.route("/getTrainers").get(getTrainersData);

export default router;