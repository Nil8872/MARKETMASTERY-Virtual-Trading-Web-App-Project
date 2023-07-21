 

// const prices = require("../services/Total_Market_Share_Prices.js");
// const prices = require('../services/Nifty-50_Share_price_Data.js');

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
  prices =  result;
   
};

getData();

const realTimeDataFetch = () => {
  setInterval(async() => {
    await getData();
    if(prices){
    prices.map(async (share) => { 

      try {
        
        const data = await fetch(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${share.sharename}.ns?modules=financialData`)
            const aaplePrice = await data.json();
            console.log(aaplePrice);
          const LTP = aaplePrice.quoteSummary.result[0].financialData.currentPrice.raw; 
          share.ltp = LTP;
        share.absoluteprice = share.ltp - share.lastprice;
        share.percentegeprice = (share.absoluteprice * 100) / share.lastprice;
        let id = share._id;
        await RealTimeShareData.findByIdAndUpdate(
          id,
          { $set: share },
          { new: true }
          );
        
      } catch (error) {
        console.log(error);
      }
        
         
    });
  }
  }, 5000);
};

// realTimeDataFetch();
const randomPriceGenerator = () => {
  setInterval(async() => {
    await getData();
    prices.map(async (share) => {
      if(Math.abs(share.percentegeprice) <50){
        let randomprice = Math.random() - 0.5;
        if(share.ltp > 20000){


          
          randomprice = randomprice*5;
        }
        else if(share.ltp>2000 && share.ltp<=2000){
          randomprice = randomprice;
        }
        else if(share.ltp > 1000){
          randomprice = randomprice /2
        }
        else if(share.ltp >500){
          randomprice = randomprice /5;
        }
        else if(share.ltp>100){
          randomprice = randomprice /10;
          
        }
        else if(share.ltp > 50){
          randomprice = randomprice /20;
          
        }
        else if(share.ltp > 10){
          randomprice = randomprice /50;
          
        }
        else if(share.ltp<10){
          
          randomprice = randomprice /100;
        }
        share.ltp = share.ltp + randomprice;
        share.absoluteprice = share.ltp - share.lastprice;
        share.percentegeprice = (share.absoluteprice * 100) / share.lastprice;
        let id = share._id;
        await RealTimeShareData.findByIdAndUpdate(
          id,
          { $set: share },
          { new: true }
          );
        
      }
    });
  }, 5000);
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
