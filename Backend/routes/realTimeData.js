// const prices = [
//     {
//       sharename : "TATAMOTORS",
//       absoluteprice : 11.60,
//       percentegeprice : 2.30,
//       ltp: 460,
//       lastprice: 460,
//   },
//   {
//       sharename : "RELIENCE",
//       absoluteprice : 96.35,
//       percentegeprice : 4.30,
//       ltp: 2331,
//       lastprice: 2331,

//   },
//   {
//       sharename : "HDFCBANK",
//       absoluteprice : 21.35,
//       percentegeprice : 1.37,
//       ltp: 1609.55,
//       lastprice: 1609.55,
//   },
//   {
//       sharename : "ADANIPOWER",
//       absoluteprice : 9.35,
//       percentegeprice : 4.99,
//       ltp: 191.60,
//       lastprice: 191.60,
//   },
//   {
//       sharename : "ADANIGREEN",
//       absoluteprice : -13.35,
//       percentegeprice : -1.40,
//       ltp: 881.15,
//       lastprice: 881.15,
//   },
//   {
//       sharename : "AWL",
//       absoluteprice : 19.35,
//       percentegeprice : 4.99 ,
//       ltp: 405.85,
//       lastprice: 405.85,
//   },
//   {
//       sharename : "WIPRO",
//       absoluteprice : 6.20,
//       percentegeprice : 1.73,
//       ltp: 365.25,
//       lastprice: 365.25,
//   },
//   {
//       sharename : "KOTAKBANK",
//       absoluteprice : 11.80,
//       percentegeprice : 0.69,
//       ltp: 1732.85,
//       lastprice: 1732.85,
//   },
//   {
//       sharename : "ASHOKLEY",
//       absoluteprice : 2.75,
//       percentegeprice : 2.02,
//       ltp: 139.20,
//       lastprice: 139.20,
//   },
//   {
//       sharename : "M&M",
//       absoluteprice : 14.40,
//       percentegeprice : 1.26,
//       ltp: 1158.70,
//       lastprice: 1158.70,
//   },
//   {
//       sharename : "M&MFIN",
//       absoluteprice : 4.35,
//       percentegeprice : 2.18,
//       ltp: 231.65,
//       lastprice: 231.65,
//   },
//   {
//       sharename : "TATASTEEL",
//       absoluteprice : 0.90,
//       percentegeprice : 0.87,
//       ltp: 104.50,
//       lastprice: 104.50,
//   },
//   {
//       sharename : "MOTHERSON",
//       absoluteprice : 2.35,
//       percentegeprice : 3.30,
//       ltp: 67.10,
//       lastprice: 67.10,
//   },
//   {
//       sharename : "HDFC",
//       absoluteprice : 5.40,
//       percentegeprice : 4.30,
//       ltp: 2625.50,
//       lastprice: 2625.50,
//   },
//   {
//       sharename : "BHARTIARTL",
//       absoluteprice : 5.35,
//       percentegeprice : 0.73,
//       ltp: 749.00,
//       lastprice: 749.00,
//   },
//   {
//       sharename : "SBIN",
//       absoluteprice : 7.35,
//       percentegeprice : 1.30,
//       ltp: 523.25,
//       lastprice: 523.25,
//   },
//   {
//       sharename : "SBICARD",
//       absoluteprice : 96.35,
//       percentegeprice : 20.30,
//       ltp: 740.20,
//       lastprice: 740.20,
//   },
//   {
//       sharename : "ICICIBANK",
//       absoluteprice : 2.78,
//       percentegeprice : 3.08,
//       ltp: 877.25,
//       lastprice: 877.25,
//   },
//   {
//       sharename : "ITC",
//       absoluteprice : 0.75,
//       percentegeprice : 0.20,
//       ltp: 383.50,
//       lastprice: 383.50,
//   },


//   ];

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
