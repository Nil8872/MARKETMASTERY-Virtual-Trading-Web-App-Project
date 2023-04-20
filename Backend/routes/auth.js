require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { fetchUser } = require("../middleware/userFetch");

// here endpoint is /api/auth/createUser and this is POST request...
router.post(
  "/createUser",
  [
    body("email", "please Enter valid email").isEmail(),
    body("name", "name should be atleast 5 character").isLength({ min: 5 }),
    body("password", "password should be atleast 6 character").isLength({
      min: 6,
    }),
    body("startAmount"),
  ],
  async (req, res) => {
    // let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check for if email is already exist or not
    try {
      const userOne = await User.findOne({ email: req.body.email });

      if (userOne) {
        return res.send({
          error: "Email is already exist please try with other Email.",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt); 
        const userData = req.body;
        const registerData = {...userData, password:secPassword} 
        
        // here new user is created
        await User.create(registerData);

       
        res.status(200).send({ success: true, message: "Register Successfully!" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server Error");
    }
  }
);

// here endpoint is /api/auth/login and this is POST request... login not required

router.post(
  "/login",
  [
    body("email", "please Enter valid email").isEmail(),
    body("password", "Password is not Empty").exists(),
  ],
  async (req, res) => {
    try {
      let success = false;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .send({ success, error: "Please Enter Correct Credential" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .send({ success, error: "Please Enter Correct Credential" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const userToken = jwt.sign(data, process.env.JWT_SECRET);

      res.send({ success: true, userToken });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server Error");
    }
  }
);

// here endpoint is /api/auth/getuser and this is POST request... login required
router.post("/getUser", fetchUser, async (req, res) => {
  try {
    const userId = await req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server Error");
  }
});

router.put("/updateUser/:id", fetchUser, async (req, res) => {
  const updatedData = req.body; 

  try {
  const result = await User.findByIdAndUpdate(
    (req.params.id).toString(),
    { $set: updatedData },
    
    { new: true }
  );  
  

  res.status(200).send(result);
} catch (error) {
   console.log(error) 
   res.status(500).send({success: false});
}
  
});

module.exports = router;
