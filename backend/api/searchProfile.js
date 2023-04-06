const User = require("../models/Users");

const searchProfile = async (searchTerm) => {
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
