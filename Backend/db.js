const mongoose = require("mongoose");
require('dotenv').config()

// process.env.DATABASE_URL
const connectURI =
  "mongodb://127.0.0.1:27017/MMDataBase?directConnection=true&serverSelectionTimeoutMS=2000";
const connectToMongo = () => {
  mongoose
    .connect(connectURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Connection with DataBase is Successfull");
    })
    .catch((e) => console.log(e));
};
 
module.exports = connectToMongo;

