import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { addProduct } from "../controllers/product.controller.js";

const router = Router()

router.route("/new").post(
  addProduct
);
export default router