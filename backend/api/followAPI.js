const User = require('../models/Users');

const followAndUnfollow = async (followingId, followerId) =>{
    const following = await User.findById(followingId)
    following.followers.includes(followerId) ? following.followers.pull(followerId) : following.followers.push(followerId)
    await following.save()

    const follower = await User.findById(followerId)
    follower.following.includes(followingId) ? follower.following.pull(followingId) : follower.following.push(followingId)
    await follower.save()
}

module.exports = {
    followAndUnfollow
}