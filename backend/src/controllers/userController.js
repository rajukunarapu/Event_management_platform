const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const Jwt = require('jsonwebtoken')
require('dotenv').config()

exports.storeUsers = async (req, res) => {

  try {
    const { user } = req.body;
    const hashedPassword = await bcrypt.hash(user.pass, 10);

    const newUser = new userModel({ email: user.email, password: hashedPassword }); //new Document
    await newUser.save(); // save Document

    res.status(200).send({ success: "ok", message: "User registered" });

  } catch (error) {
    console.error("Error occured while storing userData")
    res.status(500).send({ success: "fail", message: "user was not registered" });
  }
};


exports.tokenGeneration = async(req,res)=>{

    try{
        const {user} = req.body;
        const userFromDB = await userModel.findOne({email:user.email})  // fetching user by email

        if(!user && !( await bcrypt.compare(user.pass, userFromDB.password) )){  // comparing user entered password and Database stored password
            return res.status(400).send({message:'Invalid credentials'})
        }

        // JSON Web token
        const newToken = Jwt.sign({ email:userFromDB.email, userId:userFromDB._id },process.env.JWT_SECRETE,{expiresIn:'2h'})
        res.status(200).send( { token:newToken, success:'ok', message:"Token has been sent" } )
        
    }catch(error){
        console.error("Invalid credentials",error)
        res.status(500).send({ success:'fail', message:'Invalid credentials' })
    }
}

exports.accessToDashboard = (req,res)=>{
    res.status(200).send({ success:'ok', message:'Access granted to dashboard' })
}

exports.submitEvent = async(req,res)=>{

  try{
    const {eventDetails} = req.body
    console.log({"req.body":req.body})
    if(!req.userId){
      return res.status(401).json({success:'fail', message:'unauthorized'})
    }
    const updateUser = await userModel.findByIdAndUpdate(req.userId,{events: [eventDetails] },{ new: true, upsert: true})
    console.log({"updateUser":updateUser})
    if (!updateUser) {
      return res.status(404).json({ success: 'fail', message: 'User not found' });
    }

    res.status(200).json({ success: 'ok' , message: 'Event Deatails were added to DB'})

  }catch(error){
    return res.status(500).json({ success: 'fail', message: 'User not found' });
    console.log({"error":error})
  }
}  

exports.eventData = async(req,res)=>{
  try{
    if(!req.userId){
      return res.status(401).json({success:'fail', message:'unauthorized'})
    }
    const userFromDB = await userModel.findOne(req.userId)
    res.status(200).send({ data:userFromDB.events , success:'ok', message:'Event Details was sent' })
  }catch(error){
    return res.status(401).json({success:'fail', message:'unauthorized'})
    console.error("Error",error)
  }
}