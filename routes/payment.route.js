// routes/payment.route.js
const express = require("express");
const { createPayment } = require("../controllers/paymentController");

const router = express.Router();

// Route for initiating a payment
router.post("/", createPayment);

module.exports = router;
