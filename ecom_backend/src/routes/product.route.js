import { Router } from "express";
import {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductByCategory,
    addToCartProduct,
    getCartProducts,
    getProductBySize,
    getProductByColor
} from "../controllers/product.controller.js";

const router = Router()

router.route("/create").post(addProduct);
router.route("/").get(getProducts);
router.route("/product/color/:color").get(getProductByColor);
router.route("/product/size/:size").get(getProductBySize);
router.route("/:id").get(getProductById);
router.route("/:id/update").put(updateProduct);
router.route("/:id/delete").delete(deleteProduct);
router.route("/category/:category").get(getProductByCategory);
router.route("/add-to-cart").post(addToCartProduct);
router.route("/cart/:id").get(getCartProducts);
export default router