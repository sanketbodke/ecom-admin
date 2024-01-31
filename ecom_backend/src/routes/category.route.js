import { Router } from "express";
import { createCategory, getCategories, getCategoryById } from "../controllers/category.controller.js";

const router = Router()

router.route("/create").post(createCategory)
router.route("/").get(getCategories)
router.route("/:id").get(getCategoryById)

export default router