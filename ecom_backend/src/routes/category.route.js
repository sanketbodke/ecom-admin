import { Router } from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller.js";

const router = Router()

router.route("/create").post(createCategory)
router.route("/").get(getCategories)
router.route("/:id").get(getCategoryById)
router.route("/:id/update").put(updateCategory)
router.route("/:id/delete").delete(deleteCategory)
export default router