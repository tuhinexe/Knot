const User = require('../models/Users');

const followAndUnfollow = async (followingId, followerId) =>{
    const followerPromise = User.findById(followerId)
    const followingPromise = User.findById(followingId)
    const [follower, following] = await Promise.all([followerPromise, followingPromise])

    if(following.followers.includes(followerId)){
        following.points -= 10;
        following.followers.pull(followerId)
    } else{
        following.points += 10;
        following.followers.push(followerId)
    }

    follower.following.includes(followingId) ? follower.following.pull(followingId) : follower.following.push(followingId)
    await Promise.all([following.save(), follower.save()])
}

module.exports = {
    followAndUnfollow
}