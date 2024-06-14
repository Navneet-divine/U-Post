const express = require("express");
const router = express.Router();
const post = require("../controllers/post");
const { isLoggedIn } = require("../middlewares/isloggedIn");
const {validatePost, validateComment} = require("../middlewares/validatePost");

const catchAsync = require("../utils/catchAsyncError");

const multer = require('multer');
const { storage } = require('../cloudinary'); 
const { isAuthor } = require("../middlewares/isAuthor");
const upload = multer({ storage });

router.route("/post")
    .get(isLoggedIn,post.renderPost)
    .post(isLoggedIn,upload.single("image"),validatePost,catchAsync(post.addPost));

router.get("/post/edit/:postId",post.renderEditPost);    
router.put("/post/edit/:postId",upload.single("image"),validatePost,post.editPost);    
router.delete("/post/delete/:postId", post.deletePost); 

router.get("/allposts", isLoggedIn,post.allPosts);

router.get("/post/show/:postId",isLoggedIn,post.showPost);
router.get("/post/show/:postId/update",isLoggedIn,isAuthor,post.renderUpdateShowPost);
router.put("/post/show/:postId/edit",isLoggedIn,upload.single("image"),validatePost,catchAsync(post.editShowPost));
router.delete('/post/show/:postId/delete', post.deleteShowPost);

router.post("/post/show/:postId/comment",validateComment,post.postComment);
router.get("/post/show/:postId/:commentId/edit",post.renderEditpostComment);
router.put("/post/show/:postId/:commentId/edit",validateComment,post.editPostComment);
router.delete("/post/show/:postId/:commentId/delete",post.deletePostComment);

module.exports = router;