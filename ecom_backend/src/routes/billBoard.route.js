import { Router } from "express";
import { generateBillBoard } from "../controllers/billBoard.controller.js";

const router = Router()

router.route("/create").post(generateBillBoard)

export default router