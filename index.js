const express = require('express');
const app = express();
const ControllApp = require("./controller/app")
const mongoose = require("mongoose")

// read the window
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set("view engine","ejs")

// // connect to mongoose
mongoose.connect("mongodb+srv://moxirbek:dilshodbek0422@cluster0.fp1t4.mongodb.net/?retryWrites=true&w=majority")
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