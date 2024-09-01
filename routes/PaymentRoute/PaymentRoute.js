
const express = require('express');
const router = express.Router();
// const PaymentService = require('../../services/MenuService/MenuService');
const { paymentSuccess, paymentFail } = require('../../controler/PaymentControler/PaymentControler');
const {orderCreate} = require('../../services/PaymentService/PaymentService')

// Create order route
router.post("/order", orderCreate );

// Payment success and fail routes
router.get('/payment/success/:tranId', paymentSuccess);
router.get('/payment/fail/:tranId', paymentFail);

module.exports = router;
