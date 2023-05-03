const express = require("express");
const router = express.Router();

const { fetchUser } = require("../middleware/userFetch");

const WatchListShare = require("../models/whatchlistShare");

// route 1 : get share  path is : /api/share/get  auth token required..

router.get("/get", fetchUser, async (req, res) => {
  try {
    const whatchlistShare = await WatchListShare.find({ user: req.user.id });
    res.send(whatchlistShare);
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
      const data = req.body;
      const sharename = await WatchListShare.findOne({
        $and: [{ sharename: data.sharename }, { user: req.user.id }],
      });
      console.log("*******************");
      console.log(sharename);
      console.log("*******************");
      if (sharename !== null) {
        console.log("If part run")
        return res.send({
          success: false,
          message: "Share is already in your watch list",
        });
      } else {
        console.log("Else part run");
        const share = new WatchListShare({
          user: req.user.id,
          ...data,
        });

        const result = await share.save();
        console.log("share Added");
        res.send({ status: "success" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server Error");
    }
  }
);

// route 3 : add share  path is : /api/share/deleteShare  auth token required..
router.delete(
  "/deleteShare",
  fetchUser,

  async (req, res) => {
    try {
      const sharename = req.body.sharename;

      let deleteShare = await WatchListShare.find({ sharename });

      await WatchListShare.deleteOne({ sharename });
      res.send({ success: true, message: "Share Successfully Deleted!" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ success: false, message: "Internal server Error" });
    }
  }
);

module.exports = router;
