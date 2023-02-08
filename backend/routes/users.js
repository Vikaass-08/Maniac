import express from 'express'
import verify from "./verifyToken.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import {registerValidation, loginValidation} from "../validations.js";
import fs from "fs";

const router = express.Router();

//Define storage for the images
const multerStorage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./public/uploads/images");
  },

  //add back the extension
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

//reject a file
const multerFilefilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

//uploads parameters for multer
const upload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: multerFilefilter,
});

router.route("/register").post(async (req, res) => {
  // Let's validate the data
  const data = registerValidation(req.body);
  if (data.error)
    return res.status(400).json({ msg: data.error.details[0].message });

  // checking if user is already in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ msg: "Email already exists" });
  const usernameExist = await User.findOne({ username: req.body.username });
  if (usernameExist)
    return res.status(400).json({ msg: "Username already exists" });

  // Hash Passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

router.route("/login").post(async (req, res) => {
  // Let's validate the data
  const data = loginValidation(req.body);
  if (data.error)
    return res.status(400).json({ msg: data.error.details[0].message });

  // checking if username exists in database
  const user = await User.findOne({ username: req.body.username });
  if (!user)
    return res.status(400).json({ msg: "Enter a valid username and password" });

  // if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).json({ msg: "Enter a valid username and password" });

  // Create and assign a token
  // process.env.TOKEN_SECRET can be any value, it doesn't matter
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  //Get profile pic of user
  let img_url = "";
  await User.findById(user._id, function (err, data) {
    if (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }

    img_url = data.image ? data.image : "public/uploads/images/defaultUser.jpg";
  });

  res.status(201).json({ auth: true, token: token, image: img_url });
});

router.post("/updateUser", verify, async (req, res) => {
  const user_id = req.user["_id"];

  let updatedUser = {};
  if (req.body.email) updatedUser.email = req.body.email;
  if (req.body.name) updatedUser.name = req.body.name;
  if (req.body.age) updatedUser.age = req.body.age;
  if (req.body.username) updatedUser.username = req.body.username;
  if (req.body.phone) updatedUser.phone = req.body.phone;

  const update = await User.findByIdAndUpdate(
    user_id,
    updatedUser,
    function (err, data) {
      if (err) {
        res.status(400).json({ status: "failed", msg: "Error: " + err });
      } else {
        res.json({
          status: "success",
          msg: "Exercise updated!",
          results: {
            username: data.username ? data.username : "",
            email: data.email ? data.email : "",
            phone: data.phone ? data.phone : "",
            name: data.name ? data.name : "",
            age: data.age ? data.age : "",
            image: data.image
              ? data.image
              : "public/uploads/images/defaultUser.jpg",
          },
        });
      }
    }
  );
});

router.get("/updateUser", verify, async (req, res) => {
  const user_id = req.user["_id"];

  User.findById(user_id, function (err, data) {
    if (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }

    res.status(201).json({
      status: "success",
      message: "Profile Image Updated Successfully",
      results: {
        username: data.username ? data.username : "",
        email: data.email ? data.email : "",
        phone: data.phone ? data.phone : "",
        name: data.name ? data.name : "",
        age: data.age ? data.age : "",
        image: data.image
          ? data.image
          : "public/uploads/images/defaultUser.jpg",
      },
    });
  });
});

router.post("/profile", upload.single("image"), verify, async (req, res) => {
  const user_id = req.user["_id"];
  let profilePic = req.file.path;
  User.findById(user_id, function (err, data) {
    // Path for previous profile pic
    const path = data.image;

    //check if profile pic is valid
    data.image = profilePic ? profilePic : data.image;

    data
      .save()
      .then((doc) => {
        try {
          // Delete previous profile pic
          fs.unlinkSync(path);
        } catch (err) {}
        // response with image
        res.status(201).json({
          status: "success",
          message: "Profile Image Updated Successfully",
          image: doc.image
            ? doc.image
            : "public/uploads/images/defaultUser.jpg",
        });
      })
      .catch((err) => {
        res.json({
          status: "failed",
          error: err,
        });
      });
  });
});

router.get("/profile", verify, async (req, res) => {
  const user_id = req.user["_id"];

  User.findById(user_id, function (err, data) {
    if (err) {
      res.status(400).json({
        status: "failed",
        error: err,
      });
    }

    res.status(201).json({
      status: "success",
      message: "Profile Image Updated Successfully",
      results: {
        username: data.username ? data.username : "",
        email: data.email ? data.email : "",
        phone: data.phone ? data.phone : "",
        name: data.name ? data.name : "",
        age: data.age ? data.age : "",
        image: data.image
          ? data.image
          : "public/uploads/images/defaultUser.jpg",
      },
    });
  });
});

export default router;
