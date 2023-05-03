 

// const prices = require("../services/Total_Market_Share_Prices.js");

const express = require("express");
const router = express.Router();
const RealTimeShareData = require("../models/realTimeShareData");

const firstTimeSaveShare = async () => {
  console.log("fuction is called");

  try {
    await RealTimeShareData.insertMany(prices);
  } catch (error) {
    console.log(error);
  }
};
// firstTimeSaveShare();

 

let prices;

const getData = async () => {
  const result = await RealTimeShareData.find();
  prices = result;
};

getData();

const randomPriceGenerator = () => {
  setInterval(() => {
    getData();
    prices.map(async (share) => {
      let randomprice = Math.random() - 0.5;
      share.ltp = share.ltp + randomprice;
      share.absoluteprice = share.ltp - share.lastprice;
      share.percentegeprice = (share.absoluteprice * 100) / share.lastprice;
      let id = share._id;
      await RealTimeShareData.findByIdAndUpdate(
        id,
        { $set: share },
        { new: true }
      );
    });
  }, [500]);
};

randomPriceGenerator();

router.get("/getPrices", async (req, res) => {
  try {
    const prices = await RealTimeShareData.find();

    res.status(200).send(prices);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server Error");
  }
});

module.exports = router;
