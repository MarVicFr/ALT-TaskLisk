const UserModel = require("../models/UserModel");

module.exports.getUsers = async (req, res) => {
  const user = await UserModel.find();
  res.send(user);
};

module.exports.saveUser = async (req, res) => {
    const { username, email } = req.body;
  
    UserModel.create({
      username,
      email,
    }).then((data) => {
      console.log("User add successfully");
      res.send(data)
    });
  };


  module.exports.deleteUser = async (req, res) => {
    const { _id } = req.body;
    UserModel.findByIdAndDelete(_id)
      .then(() => res.send("Deleted successfully !"))
      .catch((err) => console.log(err));
  };