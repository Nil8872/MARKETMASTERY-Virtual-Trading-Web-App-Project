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
    console.log(error)
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
      console.log(error)
      res.status(500).send("Internal server Error");
    }
  }
);

module.exports = router;
