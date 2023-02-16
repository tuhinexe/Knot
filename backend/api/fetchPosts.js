const Post = require("../models/Posts");



const fetchPosts = async () => {
    const posts = await Post.find({}).sort({createdAt: -1}).populate("creator").exec();
    return posts;
    }

module.exports = fetchPosts;

