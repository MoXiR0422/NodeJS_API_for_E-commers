const Coupon=require('../models/couponModel');
const validateMongoDbId = require('../utils/validateMongodbId');
const asynHandler=require('express-async-handler');

const createCoupon = asynHandler(async(req, res) => {
    try{
        const newCoupon=await Coupon.create(req.body)
        res.json(newCoupon)

    }catch(error){
        throw new Error(error)
    }
});

const getAllCoupons = asynHandler(async(req, res) => {
    try{
        const coupons=await Coupon.find()
        res.json(coupons)

    }catch(error){
        throw new Error(error)
    }
});

const updateCoupons = asynHandler(async(req, res) => {
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const updatecoupons=await Coupon.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.json(updatecoupons)

    }catch(error){
        throw new Error(error)
    }
});


const deleteCoupons = asynHandler(async(req, res) => {
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const deletecoupons=await Coupon.findByIdAndDelete(id)
        res.json(deletecoupons)

    }catch(error){
        throw new Error(error)
    }
});

const getCoupon = asynHandler(async(req, res) => {
    const {id}=req.params;
    validateMongoDbId(id)
    try{
        const getAcoupon=await Coupon.findById(id)
        res.json([getAcoupon])

    }catch(error){
        throw new Error(error)
    }
});

module.exports={createCoupon,getAllCoupons,updateCoupons,deleteCoupons,getCoupon};