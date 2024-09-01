const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema(
    {
        transactionId: { type: String, required: true, unique: true },
        amount: { type: Number, required: true },
        productName: { type: String, required: true },
        customerName: { type: String, required: true },
        customerEmail: { type: String, required: true },
        customerAddress: { type: String, required: true },
        customerPhone: { type: String, required: true },
        status: { type: String, enum: ['Pending', 'Success', 'Failed', 'Cancelled'], default: 'Pending' },
        paymentDetails: { type: Object },
    },
    { timestamps: true }
);

const PaymentModel = mongoose.model('Payment', paymentSchema);
module.exports = PaymentModel;
