import { Router } from "express";
import { addColor, getColor, getColorById } from "../controllers/color.controller.js";

const router = Router()

router.route("/create").post(addColor)
router.route("/").get(getColor)
router.route("/:id").get(getColorById)

export default router