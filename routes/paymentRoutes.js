import express from "express";
const router = express.Router();

import { isAuthenticated, authorizeAdmin } from "../middlewares/Auth.js";
import { buySubscription } from "../controllers/paymentController.js";

router.route("/subscribe").get(isAuthenticated, buySubscription);



export default router;