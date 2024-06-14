const express = require("express");
const router = express.Router();
const {isLoggedIn} = require("../middlewares/isloggedIn");
const userProfile = require("../controllers/profile");

router.get("/profile",isLoggedIn,userProfile.renderProfile);
router.get("/profile/edit",isLoggedIn,userProfile.renderEditProfile);
router.put("/profile/edit",userProfile.editProfile);


module.exports = router;