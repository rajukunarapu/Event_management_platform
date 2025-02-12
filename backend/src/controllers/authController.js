const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const Jwt = require('jsonwebtoken')
require('dotenv').config()

exports.signup = async (req, res) => {
  try {
    const { user } = req.body;  // user = { email : '', pass: '' }
    const hashedPassword = await bcrypt.hash(user.pass, 10);

    const newUser = new userModel({ email: user.email, password: hashedPassword }); //new Document
    await newUser.save(); // save Document

    //new tokens
    const accessToken = Jwt.sign({ userId : newUser._id }, process.env.ACCESS_TOKEN_SECRETE,{expiresIn:'7d'})
    // const refreshToken = Jwt.sign({ userId : newUser._id }, process.env.REFRESH_TOKEN_SECRETE,{expiresIn:'7d'})

    // res.cookie("refreshToken", refreshToken, { httpOnly:true, secure:true, sameSite:'strict'} )
    res.status(200).send({ success: "ok", message: "user registered", accessToken});

  } catch(error) {
    console.error("Error occured while registered",error)
    res.status(500).send({ success: "fail", message: "user not registered" });
  }
};


exports.signin = async(req,res)=>{
    try{
        // const {user} = req.body;   // user = { email : '', pass: '' }
        if(!req.userId){
          return res.status(401).json({success:'fail', message:'unauthorized'})
        }
        // const userFromDB = await userModel.findOne(req.userId)  // fetching user by email

        // if(!user && !( await bcrypt.compare(user.pass, userFromDB.password) )){  // comparing user entered password and Database stored password
        //     return res.status(401).send({message:'Invalid credentials'})
        // }

        // access token = short-lived token  refresh token = used to generate access token and it long-lived token
        // const accessToken = Jwt.sign({ userId : newUser._id }, process.env.ACCESS_TOKEN_SECRETE,{expiresIn:'7d'})
        // const refreshToken = Jwt.sign({ userId : newUser._id }, process.env.REFRESH_TOKEN_SECRETE,{expiresIn:'7d'})

        // res.cookie("refreshToken", refreshToken, { httpOnly:true, secure:true, sameSite:true})
        // res.status(200).send( { accessToken, success:'ok', message:"Valid credentials" } )
        res.status(200).send( { success:'ok', message:"Valid credentials" } )
        
    }catch(error){
        console.error("Invalid credentials",error)
        res.status(500).send({ success:'fail', message:'Invalid credentials' })
    }
}

// exports.refreshToken = (req,res)=>{
//     try{
//       const refreshToken = req.cookies.refreshToken;
//       if(!refreshToken) return res.status(401).send({ success:'fail', message:'token not found' })

//       // verifying refresh token
//       const decoded = Jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE)

//       //creating new access token
//       const newAccessToken = Jwt.sign({ userId: decoded.userId }, process.env.ACCESS_TOKEN_SECRETE, { expiresIn:'15m' })
//       res.status(200).send({ success:'ok', message:'new accessToken', token:newAccessToken})
//     }catch(error){
//       console.error("invalid refresh token")
//       res.status(500).send({ success:'fail', message: 'Invalid refreshToke'})
//     }
// }

