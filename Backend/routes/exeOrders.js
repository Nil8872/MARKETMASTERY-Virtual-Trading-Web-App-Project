const express = require("express");
const router = express.Router();
const { fetchUser } = require("../middleware/userFetch");
const  ExecuteOrder = require("../models/executeOrders");


// route 1 : add Executed or pending or complated order in DataBase

router.post('/add', fetchUser, async (req,res)=>{

    const data = req.body
    const OrederData = {...data, user: req.user.id}
    try {

        await ExecuteOrder.create(OrederData);
        res.status(200).send({success : true, message: "Oreder Added Successfully!"});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({success : false, message : "Internal server error!"});
    }
});

// route 2 : get Data of Executed orders from DataBase 

router.get('/getOrders', fetchUser, async (req,res)=>{

    try {
        const data = await ExecuteOrder.find({user: req.user.id})
        console.log(data)
        res.status(200).send(data);

    } catch (error) {
        console.log(error)
        res.status(500).send({success: false, message: "Internal server error!"})
    }
});


module.exports = router;