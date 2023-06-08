const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

// Generate "createdAt & updateAt"
userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema);