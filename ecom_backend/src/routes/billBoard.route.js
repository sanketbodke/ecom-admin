import { Router } from "express";
import { generateBillBoard, getAllBillBoards, getBillBoardById, updateBillBoard, deleteBillBoard } from "../controllers/billBoard.controller.js";

const router = Router()

router.route("/create").post(
  generateBillBoard
)

router.route("/").get(getAllBillBoards);
router.route("/:id/update").get(getBillBoardById);
router.route("/:id/update").put(updateBillBoard);
router.route("/:id/delete").delete(deleteBillBoard);

export default router