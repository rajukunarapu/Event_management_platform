const userModel = require("../models/userModel");
require('dotenv').config()

exports.submitEvent = async(req,res)=>{
  // console.log({"req.userId from submit Event ":req.userId})
    try{
      const {eventDetails} = req.body
      if(!req.userId){
        return res.status(401).json({success:'fail', message:'unauthorized'})
      }
      const updateUser = await userModel.findByIdAndUpdate(req.userId, { $push: { eventsDetails: eventDetails }} ,{ new: true, upsert: true})
      // console.log({"updateUser":updateUser})
      if (!updateUser) {
        return res.status(404).json({ success: 'fail', message: 'User not found' });
      }
  
      res.status(200).json({ success: 'ok' , message: 'Event Deatails added to DB'})
  
    }catch(error){
      return res.status(500).json({ success: 'fail', message: 'User not found' });
      console.log({"error":error})
    }
}  
  
  exports.eventData = async(req,res)=>{
    // console.log({'req.userId for event data':req.userId})
    try{
      if(!req.userId){
        return res.status(401).json({success:'fail', message:'unauthorized'})
      }
      const userFromDB = await userModel.findOne({ _id: req.userId })
      res.status(200).send({ eventDetails : userFromDB.eventsDetails , success : 'ok', message : 'Event Details sent' })
    }catch(error){
      return res.status(500).json({success:'fail', message:'unauthorized'})
      console.error("Error",error)
    }
  }