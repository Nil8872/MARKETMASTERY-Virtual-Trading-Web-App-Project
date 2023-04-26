const mongoose = require("mongoose");

const realTimeShareData = new mongoose.Schema({
  
  sharename: {
    type: String,
    required: true,
  },
  absoluteprice :{
    type : Number,
    required: true,
  },
  percentegeprice :{
    type : Number,
    required: true,
  },
  ltp :{
    type : Number,
    required: true,
  },
  lastprice :{
    type : Number,
    required: true,
  },
});

module.exports = mongoose.model("RealTimeShareData", realTimeShareData);
