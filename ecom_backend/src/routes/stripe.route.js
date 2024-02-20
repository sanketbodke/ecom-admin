import { Router } from "express";

import {payment} from "../controllers/stripe.controller.js";

const router = Router()

router.route("/").post(payment)

export default router