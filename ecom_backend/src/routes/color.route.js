import { Router } from "express";
import { addColor, getColor, getColorById, updateColor, deleteColor } from "../controllers/color.controller.js";

const router = Router()

router.route("/create").post(addColor)
router.route("/").get(getColor)
router.route("/:id").get(getColorById)
router.route("/:id/update").put(updateColor)
router.route("/:id/delete").delete(deleteColor)

export default router