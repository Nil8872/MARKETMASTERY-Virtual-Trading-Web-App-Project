const express = require("express");
const router = express.Router();

const { fetchUser } = require("../middleware/userFetch");

const baseUrl = "http://localhost:5000";
const BuySellShare = require("../models/buySellShare");

// route 1 : get share  path is : /api/share/get  auth token required..

router.get("/get", fetchUser, async (req, res) => {
  try {
    const shares = await BuySellShare.find({ user: req.user.id });

    res.send(shares);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server Error");
  }
});
// route 2 : add share  path is : /api/share/add  auth token required..

router.post(
  "/add",
  fetchUser,

  async (req, res) => {
    try {
      const { price, qty, intraInvest, limitMarket, action, sharename } =
        req.body;
      const share = new BuySellShare({
        user: req.user.id,
        price,
        qty,
        intraInvest,
        sharename,
        limitMarket,
        action,
      });

      const result = await share.save();
      res.send({ status: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server Error");
    }
  }
);

// route 3 : add share  path is : /api/share/add  auth token required..

router.put("/updateShare/:id", fetchUser, async (req, res) => {
  const updatedData = req.body;

  try {
    const result = await BuySellShare.findByIdAndUpdate(
      req.params.id.toString(),
      { $set: updatedData },

      { new: true }
    );
    console.log(result);

    res.status(200).send({ success: true, message: "Share Buy/Sell Successfully!"});
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false });
  }
});

// route 4 : add share  path is : /api/share/deleteShare  auth token required..
router.delete(
  "/deleteShare/:id",
  fetchUser,

  async (req, res) => {
    try { 
      let deleteNote = await BuySellShare.findById(req.params.id);
 

      if (deleteNote.user.toString() !== req.user.id) {
        return res.status(400).send("Not Allowed");
      }

      const result = await BuySellShare.findByIdAndDelete(req.params.id);
      res.send({success : true, message : "Share Successfully Deleted!"});

    } catch (error) {
      console.log(error)
      res.status(500).send("Internal server Error");
    }
  }
);

module.exports = router;
