import { Router } from "express";
import { generateBillBoard, getAllBillBoards, getBillBoardById, updateBillBoard } from "../controllers/billBoard.controller.js";

const router = Router()

router.route("/create").post(
  generateBillBoard
)

router.route("/").get(getAllBillBoards);
router.route("/:id/update").get(getBillBoardById);
router.route("/:id/update").put(updateBillBoard);

export default router