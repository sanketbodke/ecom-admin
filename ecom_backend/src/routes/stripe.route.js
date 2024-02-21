import { Router } from "express";

import {payment, getAllPayments} from "../controllers/stripe.controller.js";

const router = Router()

router.route("/").post(payment)
router.route("/").get(getAllPayments)

export default router