// const SSLCommerz = require('sslcommerz');
// const PaymentModel = require('../../model/Dto/MenuPayment/PaymentModel');
// const { v4: uuidv4 } = require('uuid');
// require('dotenv').config();

// const store_id = process.env.SSLCOMMERZ_STORE_ID;
// const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWD;
// const is_live = false; 

// const createOrder = async (req, res)=> {
//     try {
//         const product = req.body;
//         const tran_id = uuidv4(); // Generate unique transaction ID

//         const data = {
//             total_amount: product?.subTotal,
//             currency: 'BDT',
//             tran_id: tran_id,
//             success_url: `http://localhost:5000/payment/success/${tran_id}`,
//             fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
//             cancel_url: 'http://localhost:3000/cancel',
//             shipping_method: 'Courier',
//             product_name: 'Computer',
//             product_category: 'Electronic',
//             product_profile: 'general',
//             cus_name: product?.firstName,
//             cus_email: product?.email,
//             cus_add1: 'Dhaka',
//             cus_add2: 'Dhaka',
//             cus_city: 'Dhaka',
//             cus_state: 'Dhaka',
//             cus_postcode: '1000',
//             cus_country: 'Bangladesh',
//             cus_phone: product?.phoneNumber,
//             cus_fax: '01711111111',
//             ship_name: 'Customer Name',
//             ship_add1: product?.address,
//             ship_add2: 'Dhaka',
//             ship_city: product?.city,
//             ship_state: 'Dhaka',
//             ship_postcode: 1000,
//             ship_country: 'Bangladesh',
//         };

//         console.log(data);

//         const sslcz = new SSLCommerz(store_id, store_passwd, is_live);
//         sslcz.init(data).then(async apiResponse => {
//             let GatewayPageURL = apiResponse.GatewayPageURL;

//             res.send({ url: GatewayPageURL });
//             console.log(url);
//             const finalOrder = {
//                 transactionId: tran_id,
//                 amount: product?.subTotal,
//                 productName: data.product_name,
//                 customerName: data.cus_name,
//                 customerEmail: data.cus_email,
//                 customerAddress: data.cus_add1,
//                 customerPhone: data.cus_phone,
//                 status: 'Pending',
//                 paymentDetails: data,
//             };

//             await PaymentModel.create(finalOrder); // Save the order to the database

//             console.log('Redirecting to: ', GatewayPageURL);
//         });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }  
// }

// async getAllOrders(req, res) {
//         try {
//             const orderData = await PaymentModel.find(); // Fetch all orders
//             res.status(200).json({
//                 message: 'All Order data',
//                 success: true,
//                 data: orderData,
//             });
//         } catch (error) {
//             res.status(500).json({ message: error.message });
//         }
//     }
// module.exports = {createOrder}



// ___________________________________________


const express = require('express');
const cors = require('cors');


const SSLCommerz = require('sslcommerz');
const PaymentModel = require('../../model/Dto/MenuPayment/PaymentModel');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();

const store_id = process.env.SSLCOMMERZ_STORE_ID;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWD;
const is_live = false; 

app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// order post/create 
const orderCreate = async (req, res) => {
    try {
        const product = req.body;
        const tran_id = uuidv4();
        const data = {
            total_amount: product?.subTotal,
            currency: 'BDT',
            tran_id: tran_id,
            success_url: `http://localhost:5000/payment/success/${tran_id}`,
            fail_url: `http://localhost:5000/payment/fail/${tran_id}`,
            cancel_url: 'http://localhost:3000/cancel',
            shipping_method: 'Courier',
            product_name: 'Computer',
            product_category: 'Electronic',
            product_profile: 'general',
            cus_name: product?.firstName,
            cus_email: product?.email,
            cus_add1: 'Dhaka',
            cus_add2: 'Dhaka',
            cus_city: 'Dhaka',
            cus_state: 'Dhaka',
            cus_postcode: '1000',
            cus_country: 'Bangladesh',
            cus_phone: product?.phoneNumber,
            cus_fax: '01711111111',
            ship_name: 'Customer Name',
            ship_add1: product?.address,
            ship_add2: 'Dhaka',
            ship_city: product?.city,
            ship_state: 'Dhaka',
            ship_postcode: 1000,
            ship_country: 'Bangladesh',
        };
        console.log(data);
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway
            let GatewayPageURL = apiResponse.GatewayPageURL
            res.send({ url: GatewayPageURL })
               console.log(url); 
            const finalOrder = {
                product,
                paidStatus: false,
                tranjectionId: tran_id
            };
            const result = Order.create(finalOrder)

            console.log('Redirecting to: ', GatewayPageURL)
        });
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}


// get order 
const getAllOrder = async (req, res)=>{
    try {
        const orderData = await Order.find()
        res.status(200).json({
            message : "All Order data",
            success : true,
            data : orderData
        })
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

module.exports = { orderCreate, getAllOrder};