const express = require("express");
const router = express.Router();
const { fetchUser } = require("../middleware/userFetch");
const DayHistory = require("../models/dayHistory");



// Route : 1 endpoint is /api/dayHistory/getHistory and this is GET request... login required
router.get("/getHistory", fetchUser, async (req, res) => {
    try {
      const data = await DayHistory.find({ user: req.user.id }); 
      res.status(200).send(data);
  
    } catch (error) {
      res.status(500).send("Internal server Error");
    }
  });





router.post(
    "/add",
    fetchUser,
     
    async (req, res) => {
        try{
         const data =  req.body
         const addShareData = {...data, user: req.user.id}
      const share = new DayHistory(addShareData);
        const result = await share.save();
        res.send(result);

      } catch (error) {
        res.status(500).send("Internal server Error");
      }
    }
  );


router.delete('/clearHistory', fetchUser, async (req, res)=>{

    try {

         await DayHistory.deleteMany({user: req.user.id})

        res.status(200).send({success: true, message: "History is Clear!"})
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal server error!");
    }
})

module.exports = router
