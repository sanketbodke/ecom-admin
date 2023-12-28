import { Router } from "express";
import { addSize } from "../controllers/size.controller.js";

const router = Router()

router.route("/create").post(addSize)

export default router