const express = require("express");
const cors = require("cors");
const menuRoutes = require('./routes/MenuRouter/MenuRouter');
const paymentRoute = require('./routes/PaymentRoute/PaymentRoute');
const { GeneralError } = require("./utils/error");
const connectDb = require("./utils/db");

const app = express();
require('dotenv').config();

// Connect to database
connectDb();

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Route handling  menu route /// 
app.use("/api", menuRoutes);
app.use("/api/pay",paymentRoute)

// payment route ////

app.use((req, res) => {
    res.status(200).json({message : "server is running"})
})


// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));