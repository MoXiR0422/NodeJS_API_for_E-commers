const router = require("express").Router();
const Foydalanuvchilar=require("../models/Users")
const nodemailer=require("nodemailer")
var congfigpassword,emailcha;

router.get("/",async(req,res)=>{
  const users=await Foydalanuvchilar.find()
  res.json(users)
})
// register
router.post("/register",async(req,res)=>{
  const email = await Foydalanuvchilar.findOne({email:req.body.email})
  if(email){
    res.json("this account is already in use")
  }else{
    try{
        const newUser=new Foydalanuvchilar({
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        console.log(req.body);
        await newUser.save()
        res.status(200).json(newUser)
    }
    catch(err){
        res.status(500).json(err)
    }
  }
})

// login
router.post("/login",async(req,res)=>{    
    const user=req.body.username;
    const password=req.body.password;
    var userSuccess,auth; 
    const info=await Foydalanuvchilar.findOne({username:user})
    if(info){
        if(info.password === password){
            res.status(200).json({auth:true,info})
        }else{
            res.status(500).json({auth:false})
        }
    }else{
        res.status(500).json({userSuccess:false})
    }
})

// send message to gmail for change password
router.post("/forget",async(req,res)=>{    
  const email=req.body.email;
  var password='';
  var x=9
  for(let index=1;index<=6;index++){
      var c=Math.floor(Math.random()*6)
      password+=c
  }
  try{
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'restart.parol@gmail.com',
        pass: 'jqjlmankmtkozriy'
      }
    });  
    var mailOptions = {
      from: 'restart.parol@gmail.com',
      to: `${email}`,
      subject: 'Restart Password',
      text: `${password}`
    };
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
    emailcha=email
    congfigpassword=password
    res.json(password)
  }catch{
      res.send("yemadi")
  }
})

// change password
router.post("/password",async(req,res)=>{
  const search=await User.findOne({email:emailcha})
  const password=req.body.password
  try{
    search.password=password;
    res.status(200).json(search)
  }catch{
    res.status(500).json(err).end;
  }
})

module.exports=router