import { Router } from "express";
import { generateBillBoard, getAllBillBoards, getBillBoardById } from "../controllers/billBoard.controller.js";

const router = Router()

router.route("/create").post(
  generateBillBoard
)

router.route("/").get(getAllBillBoards);
router.route("/:id").get(getBillBoardById);

export default router