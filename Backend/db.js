const mongoose = require("mongoose");
require('dotenv').config()


const connectURI = process.env.DATABASE_URL;
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

