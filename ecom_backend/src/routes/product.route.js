import { Router } from "express";
import { addProduct, getProducts, getProductById, updateProduct, deleteProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/new").post(addProduct);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);
router.route("/:id/update").put(updateProduct);
router.route("/:id/delete").delete(deleteProduct);
export default router