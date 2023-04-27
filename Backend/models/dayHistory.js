const mongoose = require("mongoose");

const dayHistory = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
  qty: {
    type: Number, 
    required : true,
  },
  intraInvest:{
    type : String,
    required : true,
  },

  limitMarket :  {
    type : String,
    required : true,
  },
  price : {
    type :Number,
    required: true,
  },
  sharePandL:{
    type: Number,
    default: 0,
    required : true,
  }

});

module.exports = mongoose.model("DayHistory", dayHistory);
