const mongoose = require("mongoose");

const executeOrders = new mongoose.Schema({
  user:{
     
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  sharename: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  qty: {
    type: String, 
    required : true,
  },

  price : {
    type :Number,
    required: true,
  },
  status :{
    type:String,
    required : true,
  }

});

module.exports = mongoose.model("ExecuteOrder", executeOrders);
