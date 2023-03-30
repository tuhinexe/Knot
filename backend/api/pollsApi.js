const Polls=require('../models/Polls');

const voteCount=async(pollId,optionId,userId)=>{

    const poll=await Polls.findById(pollId);
    let option=poll.options.id(optionId);
    for(option of poll.options){
        if(option.voted_by.includes(userId)){
            return;
        }
    }
    option.voted_by.push(userId);
    await poll.save();
     

}

module.exports={voteCount};
