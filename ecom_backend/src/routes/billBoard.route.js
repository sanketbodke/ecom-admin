import { Router } from "express";
import { generateBillBoard, getAllBillBoards } from "../controllers/billBoard.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/create").post(
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  generateBillBoard
)

router.route("/").get(getAllBillBoards);

export default router