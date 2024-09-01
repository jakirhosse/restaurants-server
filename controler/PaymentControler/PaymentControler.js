const PaymentModel = require('../../model/Dto/MenuPayment/PaymentModel');

const paymentSuccess = async (req, res) => {
    try {
        console.log(req.params.tranId);
        const result = await PaymentModel.updateOne(
            { transactionId: req.params.tranId },
            { $set: { status: 'Success' } }
        );
        if (result.modifiedCount > 0) {
            res.redirect(`http://localhost:3000/payment/success/${req.params.tranId}`);
        } else {
            res.status(400).json({ message: "Transaction not found or already updated" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const paymentFail = async (req, res) => {
    try {
        console.log(req.params.tranId);
        const result = await PaymentModel.deleteOne(
            { transactionId: req.params.tranId },
            { $set: { status: 'Failed' } }
        );
        if (result.modifiedCount > 0) {
            res.redirect(`http://localhost:3000/payment/fail/${req.params.tranId}`);
        } else {
            res.status(400).json({ message: "Transaction not found or already delete" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { paymentSuccess, paymentFail };
