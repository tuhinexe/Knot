
const devAPI = require("../api/devAPI");
const postAPI = require("../api/postAPI");
const Posts = require("../models/Posts");

const createPostRender = async (req, res) => {
  const pageInfo = {
    user: req.user,
    title: "Knot - New Post",
    pagename: "",
    profilePic: req.user.profilePic_url,
  };
  res.render("addpost", { pageInfo: pageInfo, messages: req.flash() });
};

const createPostController = async (req, res) => {
  const user = req.user;
  const content = req.body.content;
  const imageUrl = req.body.imgUrl;
  const imageId = req.body.uploadedImgId;
  const pageInfo = {
    user: req.user,
    title: "Knot - New Post",
    pagename: "",
    profilePic: req.user.profilePic_url,
  };
  try {
    await postAPI.addPost(user, content, imageUrl, imageId);
    res.json({ success: "post added successfully" });
  } catch (err) {
    req.flash("error", "please upload an image or write a post (supported formats: jpg, jpeg, png)");
    res.json({ error: err.message });
  }
};

const likeCountController = async (req, res) => {
  if (!req.body.upvotes) return res.status(401).send("Unauthorized");
  try {
    const postId = req.body.postId;
    const currentLike = parseInt(req.body.upvotes);
    const currentDisLike = parseInt(req.body.downvotes);
    const userId = req.user._id;
    await devAPI.increaseLike(postId, currentLike, currentDisLike, userId);
  } catch (err) {
    console.log(err);
  }
};
const dislikeCountController = async (req, res) => {
  if (!req.body.downvotes) return res.status(401).send("Unauthorized");
  try {
    const postId = req.body.postId;
    const currentLike = parseInt(req.body.upvotes);
    const currentDisLike = parseInt(req.body.downvotes);
    const userId = req.user._id;
    await devAPI.decreaseLike(postId, currentLike, currentDisLike, userId);
  } catch (err) {
    console.log(err);
  }
};

const sharePostController = async (req, res) => {
  if (!req.body.shares) return;
  try {
    const postId = req.body.postId;
    const currentShare = parseInt(req.body.shares);
    const user = req.user;
    await postAPI.sharePost(postId, currentShare, user);
    res.redirect("/profile");
  } catch (err) {
    req.flash("error", "cannot share, something went wrong");
    res.redirect("/profile");
  }
};

const deletePostController = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user;
  try {
    await postAPI.deletePost(postId, user);
    res.redirect("/profile");
  } catch (err) {
    req.flash("error", "cannot delete, something went wrong");
    res.redirect("/profile");
  }
};

// Single Post and Comments Controller

const getSinglePostRender = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Posts.findById(postId).populate("creator").exec();
    const stats = await post.stats.populate("comments");
    const comments = [];
    for (let comment of stats.comments) {
      comments.push(await comment.populate("commentor"));
    }
    const pageInfo = {
      userId: req.user._id,
      title: "Knot - Post",
      pagename: "comment",
      profilePic: req.user.profilePic_url,
    };
    res.render("post", { pageInfo: pageInfo, post: post, comments: comments, messages: req.flash() });
  } catch (err) {
    res.redirect("/");
  }
};

module.exports = {
  createPostRender,
  createPostController,
  likeCountController,
  dislikeCountController,
  sharePostController,
  deletePostController,
  getSinglePostRender,
};
