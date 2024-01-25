import { Router } from "express";
import { generateBillBoard, getAllBillBoards } from "../controllers/billBoard.controller.js";

const router = Router()

router.route("/create").post(
  generateBillBoard
)

router.route("/").get(getAllBillBoards);

export default router