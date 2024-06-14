const User = require("../models/users");

module.exports.renderProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "posts",
      populate: {
        path: "author",
      },
    });
    res.render("profile/profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.renderEditProfile = (req, res) => {
  res.render("profile/editProfile");
};

module.exports.editProfile = async (req, res) => {
  const { username, email } = req.body;
  const user = await User.findById(req.user._id);
  user.username = username;
  user.email = email;
  await user.save();
  res.redirect("/profile");
};
