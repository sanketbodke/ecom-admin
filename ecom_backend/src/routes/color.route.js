import { Router } from "express";
import { addColor } from "../controllers/color.controller.js";

const router = Router()

router.route("/create").post(addColor)

export default router