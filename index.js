const express = require('express');
const app = express();
const ControllApp = require("./controller/app")
const mongoose = require("mongoose")

// read the window
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine","ejs")

// // connect to mongoose
mongoose.connect("mongodb://localhost:27017")
.then(()=>{
    console.log("connect to mongoose");
})
.catch((err)=>{
    console.log("error mongoose");
})

app.use("/",ControllApp)
const port = process.env.PORT || 8000
app.listen(port,()=>{
    console.log("server is started");
})