const mongoose = require('mongoose')



const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true,
      lowercase: true,
    },
    date: {
      type: Date,
      default: Date.now,
    }, 
    password: {
      type: String,
      required: true,
    },
    startAmount : {
      type : Number,
      required : true,
    },

    usedMargin: {
      type : Number,
      default : 0
    },
    availMargin : {
      type : Number, 
      require: true,
    },
    pAndL :{
      type : Number, 
      required: true,
    }
  });

module.exports = mongoose.model('User', userSchema);













  
//   const UsersDetails = new mongoose.model("UserDetail", userSchema);
  
//   const createDocument = async () => {
//     try {
//       const user1 = new UsersDetails({
//         name: "Umesh",
//         email: "Umesh@gmail.com",
//         password: "umesh@1234",
//       });
      
//       const user2 = new UsersDetails({
//         name: "Anil",
//         email: "Anil@gmail.com",
//         password: "Anil@1234",
//       });
//       const user3 = new UsersDetails({
//         name: "Bhavesh",
//         email: "Bhavesh@gmail.com",
//         password: "Bhavesh@1234",
//       });
//       const user4 = new UsersDetails({
//         name: "Sariya",
//         email:"Sariya@gmail.com",
//         password: "Sariya@1234",
//         video: 10,
//       });
  
      // const result = await UsersDetails.insertMany([user1, user2, user3]);
      // console.log(result);
//       const result = await user4.save();
//       console.log(result);
//     } catch (e) {
//       console.log(e);
//     }
//   };
  
//   createDocument();
  
//   const getDocument = async ()=>{
//       const result = await UsersDetails.find({reactCourse : true}).select({name:1}).limit(1).skip(1);
//       console.log(result);
//   }
  // getDocument();
  
//   const updateDocument = async ()=>{
//     const result = await UsersDetails.findByIdAndUpdate({_id : "640e9629112d5be370dcb58c"}, {$set : {email: "new@gmail.in"}},
//     {
//       new: true,
//     });
//     console.log(result);
//   }
//   // updateDocument();
//   const deleteDocument = async()=>{
//     const result = await UsersDetails.deleteOne({name : "Nilesh"});
//     console.log(result);
//   }
//   // deleteDocument();
   
//   const countDocu = async() =>{
//     const result = await UsersDetails.find({},{name: 1})
//     // .countDocuments();
//     .sort({name: -1})
//     console.log(result);
//   }