const getPosts = require('../api/fetchPosts');


const feedController = async (req,res) => {
    const pageInfo = {
        title: 'Knot - Home',
        pagename : 'home',
        profilePic: req.user.profilePic_url,
        userId: req.user._id,
        user: req.user
    }

try{
    const posts = await getPosts();
    res.render('home', {posts, pageInfo: pageInfo});
} catch (err) {
    console.log(err);
    res.render('home', {posts: []});
}
}

module.exports = {
    feedController
}
