import { Router } from "express";

import {getCategoryData} from "../controllers/category.controller.js";

const router = Router()

router.route("/:category").get(getCategoryData)

export default router