const pointsController = (req, res) => {
  const pageInfo = {
    pageTitle: "Knot - Points",
    profilePicLoggedIn: req.user.profilePic_url,
    pageName: "points",
    user: req.user,
    currentUser: req.user,
  };
  res.render("points", { pageInfo });
};

module.exports = { pointsController };
