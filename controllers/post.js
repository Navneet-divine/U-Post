const Post = require("../models/posts");
const User = require("../models/users");
const Comment = require("../models/comment");
const ExpressError = require("../utils/ExpressError");

module.exports.renderPost = (req, res) => {
  res.render("posts/addPost");
};

module.exports.addPost = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const post = new Post(req.body);
  post.author = req.user._id;
  if (req.file && req.file.path) {
    post.Image = req.file.path;
  } else {
    return next(new ExpressError("Image is required!!", 400));
  }
  user.posts.push(post);
  await user.save();
  await post.save();
  res.redirect("/profile");
};

module.exports.renderEditPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.render("posts/editPost", { post });
};

module.exports.editPost = async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findByIdAndUpdate(postId, req.body, { new: true });

  if (req.file && req.file.path) {
    post.Image = req.file.path;
  } else {
    return next(new ExpressError("Image is required!!", 400));
  }

  await post.save();
  res.redirect("/profile");
};

module.exports.deletePost = async (req, res) => {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId);
  res.redirect("/profile");
};

module.exports.allPosts = async (req, res) => {
  const posts = await Post.find().populate("author");
  res.render("posts/allPosts", { posts });
};

module.exports.showPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId)
    .populate({
      path: "comments",
      populate: { path: "author" },
    })
    .populate("author");
  res.render("posts/showPost", { post });
};

module.exports.renderUpdateShowPost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  res.render("posts/updateShowPost", { post });
};

module.exports.editShowPost = async (req, res, next) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);

  if (req.file && req.file.path) {
    post.Image = req.file.path;
  } else {
    return next(new ExpressError("Image is required", 400));
  }

  post.set(req.body);
  await post.save();
  res.redirect(`/post/show/${postId}`);
};

module.exports.deleteShowPost = async (req, res) => {
  const { postId } = req.params;
  await Post.findByIdAndDelete(postId);
  res.redirect("/allposts");
};

module.exports.postComment = async (req, res) => {
  const { postId } = req.params;
  const comment = new Comment(req.body);
  comment.author = req.user._id;
  const post = await Post.findById(postId);
  post.comments.push(comment);
  await comment.save();
  await post.save();
  res.redirect(`/post/show/${postId}`);
};

module.exports.renderEditpostComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const post = await Post.findById(postId);
  const comment = await Comment.findById(commentId);
  res.render("posts/editPostComment", { post, comment });
};

module.exports.editPostComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const comment = await Comment.findByIdAndUpdate(commentId, req.body, {
    new: true,
  });

  await comment.save();
  res.redirect(`/post/show/${postId}`);
};

module.exports.deletePostComment = async (req, res) => {
  const { postId, commentId } = req.params;
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });
  await Comment.findByIdAndDelete(commentId);
  res.redirect(`/post/show/${postId}`);
};
