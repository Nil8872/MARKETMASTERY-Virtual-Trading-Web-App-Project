const express = require("express");
const router = express.Router();
const { fetchUser } = require("../middleware/userFetch");
const  OpenOreder = require("../models/openOreder");


// route 1 :      add pending order in DataBase

router.post('/add', fetchUser, async (req,res)=>{

    const data = req.body
    const OrederData = {...data, user: req.user.id}
    try {

        await OpenOreder.create(OrederData);
        res.status(200).send({success : true, message: "Oreder Added Successfully!"});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false, message : "Internal server error!"});
    }
});

// route 2 : get Data of Open orders from DataBase 

router.get('/getOpenOrder', fetchUser, async (req,res)=>{

    try {
        const data = await OpenOreder.find({user: req.user.id})
        console.log(data)
        res.status(200).send(data);

    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: "Internal server error!"})
    }
});


module.exports = router;