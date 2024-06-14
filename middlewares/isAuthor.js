const Post = require("../models/posts");

module.exports.isAuthor = async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post.author._id.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that!");
    return res.redirect(`/post/show/${postId}`);
  }
  next();
};
