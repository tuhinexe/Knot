const Polls=require('../models/Polls');

const voteCount=async(pollId,optionId,userId)=>{
    try{
        const poll=await Polls.findById(pollId);
        let option=poll.options.find(option=>option._id==optionId);
        for(optionCheck of poll.options){
        if(optionCheck.voted_by.includes(userId)){
            return;
        }
    }
    option.voted_by.push(userId);
    await poll.save();
    } catch(err){
        console.log(err);
    }
     

}

module.exports={voteCount};
