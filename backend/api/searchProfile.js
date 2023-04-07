const User = require("../models/Users");

const searchProfile = async (searchTerm) => {
    // User.createIndexes({ firstname: "text", lastname: "text", username: "text" }).then(()=>{
    //     console.log("Indexes created");
    // }).catch((err)=>{
    //     console.log("Error creating indexes");
    // });
    //this needs to be called after droping db
    const users = await User.find(
      {
        $or: [
          { $text: { $search: searchTerm } },
          { firstname: { $regex: searchTerm, $options: "i" } },
          { lastname: { $regex: searchTerm, $options: "i" } },
          { username: { $regex: searchTerm, $options: "i" } },
        ],
      },
      {
        score: { $meta: "textScore" },
        firstname: 1,
        lastname: 1,
        username: 1,
        profilePic_url: 1,
        _id: 1,
      }
    ).sort({ score: { $meta: "textScore" } });
    return users;
  };

module.exports = searchProfile;