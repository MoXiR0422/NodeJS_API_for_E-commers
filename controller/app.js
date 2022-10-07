const express = require("express");
const AuthRoutes = require("./routes/auth")
const FacebookRoutes = require("./routes/facebook")
const ProductRoutes = require("./routes/products")
const OrderRoutes = require("./routes/order")
const SaleRoutes = require("./routes/sale")

const app=express()

// api control 

app.use("/Auth",AuthRoutes)
app.use("/product",ProductRoutes)
app.use("/auth",FacebookRoutes)
app.use("/order",OrderRoutes)
// app.use("/sale")
// app.use("/api/korzina")
// app.use("/api/support")

module.exports=app