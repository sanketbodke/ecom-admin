import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct, getProductByCategory } from "../controllers/product.controller.js";

const router = Router()

router.route("/create").post(addProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/:id/update").put(updateProduct);
router.route("/:id/delete").delete(deleteProduct);
router.route("/category/:category").get(getProductByCategory);
export default router