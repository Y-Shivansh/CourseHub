// create-order, verify-payment
import express from 'express';
import verifyUserToken from '../middlewares/user.middleware.js';
import { createOrder, verifyPayment } from '../controllers/payment.controller.js';

const router = express.Router();
router.post("/create-order", verifyUserToken, createOrder);
router.post("/verify-payment", verifyUserToken, verifyPayment);

export default router;
