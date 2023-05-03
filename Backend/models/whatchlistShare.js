const mongoose = require("mongoose");

const whatchLIstShare = new mongoose.Schema({
  user:{
     
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  sharename: {
    type: String,
    required: true
  } 
});

module.exports = mongoose.model("WatchListShare", whatchLIstShare);
