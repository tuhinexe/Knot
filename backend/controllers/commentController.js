const addComment = require("../api/addComment")
const deleteComment = require("../api/deleteComment")


const addCommentController= async (req,res) =>{
    const commentDetails = {
      content: req.body.comment,
      commentor: req.user._id
    }
    const postId = req.params.postId
  
    try{
      await addComment(commentDetails,postId)
      res.redirect(`/post/${postId}`)
    } catch(err){
      console.log(err)
    }
}

const deleteCommentController = async (req,res) =>{
    const commentId = req.body.commentId
    const postId = req.params.postId
    try{
        await deleteComment(commentId,postId)
        res.redirect(`/post/${postId}`)
    } catch(err){
        console.log(err)
    }
}

module.exports = {
    addCommentController,
    deleteCommentController
}

