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
        const userFromDB = await userModel.find({email:user.email})  // fetching user by email

        if(!user && !( await bcrypt.compare(user.pass, userFromDB.password) )){  // comparing user entered password and Database stored password
            return res.status(400).send({message:'Invalid credentials'})
        }

        // JSON Web token
        const newToken = Jwt.sign({ email:userFromDB.email, userId:userFromDB._id },process.env.JWT_SECRETE,{expiresIn:'1h'})
        res.status(200).send( { token:newToken, success:'ok', message:"Token has been sent" } )
        
    }catch(error){
        console.error("Invalid credentials",error)
        res.status(500).send({ success:'fail', message:'Invalid credentials' })
    }
}

exports.accessToDashboard = (req,res)=>{
    res.status(200).send({ success:'ok', message:'Access granted to dashboard' })
}