const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/isloggedIn");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const User = require("../models/users");

router.post(
  "/fileupload",
  isLoggedIn,
  upload.single("profileImage"),
  async (req, res) => {
    const user = await User.findById(req.user._id);
    user.profileImage = req.file.path;
    await user.save();

    res.redirect("/profile");
  }
);

module.exports = router;
