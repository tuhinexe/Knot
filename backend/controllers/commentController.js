const commentAPI = require("../api/commentAPI")


const addCommentController= async (req,res) =>{
    const commentDetails = {
      content: req.body.comment,
      commentor: req.user._id
    }
    const postId = req.params.postId
  
    try{
      await commentAPI.addComment(commentDetails,postId)
      res.redirect(`/post/${postId}`)
    } catch(err){
      req.flash("error","cannot add comment, something went wrong")
      res.redirect(`/post/${postId}`)
    }
}

const deleteCommentController = async (req,res) =>{
    const commentId = req.body.commentId
    const postId = req.params.postId
    try{
        await commentAPI.deleteComment(commentId,postId)
        res.redirect(`/post/${postId}`)
    } catch(err){
        req.flash("error","cannot delete comment, something went wrong")
        res.redirect(`/post/${postId}`)
    }
}

module.exports = {
    addCommentController,
    deleteCommentController
}

