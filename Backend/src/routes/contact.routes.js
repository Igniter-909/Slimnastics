import { Router } from "express";
import { addContact } from "../controllers/contact.controllers.js";

const router = Router();


router.route("/addContact").post(addContact);

export default router;