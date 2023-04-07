const postAPI = require('../api/postAPI');

const feedController = async (req, res) => {
  const pageInfo = {
    title: "Knot - Home",
    pagename: "home",
    profilePic: req.user.profilePic_url,
    userId: req.user._id,
    user: req.user,
  };

  try {
    const posts = await postAPI.fetchPosts();
    res.render("home", { posts, pageInfo: pageInfo, messages: req.flash() });
  } catch (err) {
    res.render("home", { posts: [], pageInfo: pageInfo, messages: req.flash() });
  }
};

module.exports = {
  feedController,
};
