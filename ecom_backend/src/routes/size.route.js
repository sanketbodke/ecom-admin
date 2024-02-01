import { Router } from "express";
import { addSize, getSizes ,getSizeById, updateSize, deleteSize } from "../controllers/size.controller.js";

const router = Router()

router.route("/create").post(addSize)
router.route("/").get(getSizes)
router.route("/:id").get(getSizeById)
router.route("/:id/update").put(updateSize)
router.route("/:id/delete").delete(deleteSize)

export default router