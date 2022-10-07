const router = require("express").Router();
const session = require("express-session");
const passport = require('passport');
const FacebookStrategy = require("passport-facebook").Strategy;
const express = require('express');
const app = express();
const Foydalanuvchilar=require("../models/Users")
var info;

// connect to facebook
router.use(session({
  saveUninitialized:true,
  secret:'SECRET'
}))
router.use(passport.initialize());
router.use(passport.session());
passport.use(new FacebookStrategy({
  clientID:"627356112117261",
  clientSecret:"e1599151e089939de35a5e254c109593",
  callbackURL:"http://localhost:3000/auth/facebook/callback",
  profileFields:['id','displayName','name','gender','picture.type(large)','email']
},
function(token,refreshToken,profile,done){
  console.log(profile)
  return done(null,profile)
}))

// get info in facebook's
router.get('/facebook',passport.authenticate('facebook',{scope:'email'}))
router.get('/facebook/callback',passport.authenticate('facebook',{
      successRedirect:'/auth/profile',
      failureRedirect:'/failed'
}))

// autorithation
router.get("/profile",async(req,res)=>{   
  var auth; 
  const findUser=await Foydalanuvchilar.findOne({username:info.name})
  if(findUser){
    if(findUser.password === info.id){
      res.status(200).json({auth:true,info})
    }else{
      res.json({auth:false})
    }
  }else{
    const newUser= new Foydalanuvchilar({
      username:info.name,
      email:info.email,
      password:info.id,
      userImage:info.picture.data.url      
    })
    await newUser.save()
    res.status(200).end()
  }
})
router.get("/failed",(req,res)=>{
  res.send("you are a non valid user")
})
passport.serializeUser(function(user,done){
  done(null,user)
  info=user._json
})
passport.deserializeUser(function(id,done){
  return done(null,id)
})

module.exports = router