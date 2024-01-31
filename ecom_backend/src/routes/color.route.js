import { Router } from "express";
import { addColor, getColor } from "../controllers/color.controller.js";

const router = Router()

router.route("/create").post(addColor)
router.route("/").get(getColor)

export default router