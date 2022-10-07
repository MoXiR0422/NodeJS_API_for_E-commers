const router=require("express").Router()
const Order= require("../models/order");
var allOrder;
router.get("/",async(req,res)=>{
    const AllOrder=await Order.find()
    allOrder=AllOrder
    res.json(AllOrder).status(200)
})
router.post("/newOrder",async(req,res)=>{
    const info=req.body;
    console.log(info.products[0].productId);
    const newOrder= new Order({
        userId:req.body.userId,
        products:[{
            productId:req.body.products[0].productId,
            stutus:req.body.products[0].status
        }]
    })
    await newOrder.save()
    res.json(newOrder).end()
})
router.delete("/:id",async(req,res)=>{
    const delet=await Order.findByIdAndDelete(req.params.id)
    res.json(allOrder).status(200).end()
})
module.exports=router