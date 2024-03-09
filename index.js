const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoute = require('./routes/authRoutes.js')
const cors = require('cors')
const app = express();
app.use(bodyParser.json());
app.use(cors())
// Connect to MongoDB
require("dotenv").config({ path: ".env" });
const Connections = async  (URL) => {
    
    try{
    await  mongoose.connect("mongodb+srv://SahilMulani:Sahil2165@cluster0.yqlks9v.mongodb.net/Finance").then(
        console.log("database connected")
    )


    } catch (err) {
        console.log("error while loding database",err)
    }

}

Connections()

// Routes
app.use('/transactions', transactionRoutes);

app.use('/auth',authRoute)

const PORT = process.env.BACKEND;
app.listen(PORT,()=>{
    console.log("server is running ON",PORT)
})
