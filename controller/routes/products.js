const ProductlarMale = require("../models/productMale")
const ProductlarFemale = require("../models/productFemale")
const router = require("express").Router()
const cloudinary = require("cloudinary")
const upload = require("./multer")
const path = require("path")
cloudinary.config({ 
    cloud_name: 'dqfe2cmwl', 
    api_key: '533348461479987', 
    api_secret: '-_kUpNdAo_3U11Hhe04efq3p4Rc' 
});
// get
router.get("/Male",async(req,res)=>{
    const Products=await ProductlarMale.find()
    res.status(200).json(Products)
})

router.get("/Male",async(req,res)=>{
    const Products=await ProductlarFemail.find()
    res.status(200).json(Products)
})

router.post("/addProduct", upload.array("img"), async (req, res) => {
    const size=req.body.size;
    var sizes = size.split(",");
    const obekt=[]
    for(var i=0;i<7;i++){
        if(req.files[i]){
            const result = await cloudinary.uploader.upload(req.files[i].path);
            obekt.push(result.secure_url)
        }
        else{
            obekt.push()
        }
    }
    const deta=new Date().toString().replace(/T/, ' ').replace(/\..+/, '')
    const gender=req.body.gender
    if(gender === "mail"){
        const newProduct = new ProductlarMale({
            title:req.body.title,
            desc:req.body.desc,
            img:obekt,
            categories:req.body.categories,
            size:sizes,
            color:req.body.color,
            price:req.body.price,
            data:deta
        });
        try {
            const savedProduct = await newProduct.save();
            res.json(newProduct).status(200).end();
        } catch (err){
           res.status(500).json(err).end();
        }
    }else if(gender==="femail"){
        const newProduct = new ProductlarFemale({
            title:req.body.title,
            desc:req.body.desc,
            img:obekt,
            categories:req.body.categories,
            size:sizes,
            color:req.body.color,
            price:req.body.price,
            data:deta
        });
        try {
            const savedProduct = await newProduct.save();
            res.json(newProduct).status(200).end();
        } catch (err){
            
            res.status(500).json(err).end();
        }
    }else{
        res.json("genderni belgilash shart")
    }
})


// $set ni qoshish kerak
router.put("/:id",async(req,res)=>{
    const gender=req.body.gender
    const deta=new Date().toString().replace(/T/, ' ').replace(/\..+/, '')
    try{    
        if(gender=== "mail"){
            const user=await ProductlarMale.findById(req.params.id)
            if(user){
                user.title=req.body.title
                user.desc=req.body.desc
                user.img=result.secure_url
                user.categories=req.body.categories
                user.size=req.body.size
                user.color=req.body.color
                user.price=req.body.price
                user.data=deta
                await user.save()
                res.json(user)
            }else{
                res.json("update qilib bolmadi")
            }
        }
        else if(gender==="femail"){
            const user=await ProductlarMale.findById(req.params.id)
            if(user){
                user.title=req.body.title
                user.desc=req.body.desc
                user.img=result.secure_url
                user.categories=req.body.categories
                user.size=req.body.size
                user.color=req.body.color
                user.price=req.body.price
                user.data=deta
                await user.save()
                res.json(user)
            }else{
                res.json("update qilib bolmadi")
            }
        }else{
            res.json("maxsulot omborda mavjud emas")
        } 
    }catch(err){
        res.status(500).json("wrrong")
    }
})


// delete
router.delete("/Male/:id",async(req,res)=>{
    try{
        const user=await ProductlarMale.findByIdAndDelete(req.params.id)
        res.status(200).json(user)
    }catch{
        res.status(500).json("error")
    }
})
router.delete("/Female/:id",async(req,res)=>{
    try{
        const user=await ProductlarFemale.findByIdAndDelete(req.params.id)
        res.status(200).json(user)
    }catch{
        res.status(500).json("error")
    }
})


module.exports=router
// TURGUNOV0805