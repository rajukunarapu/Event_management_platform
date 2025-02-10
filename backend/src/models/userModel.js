const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: [
    {
      type: Object, 
      required: false,
    }
  ]
});

module.exports = mongoose.model("userdetails", userSchema)
