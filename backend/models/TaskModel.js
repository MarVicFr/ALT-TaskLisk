const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  state: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  createdBy: {
    type: Object,
    required: true,
  },
  assignedTo: {
    type: [{}],
    required: true,
  },
});

// Generate "createdAt & updateAt"
taskSchema.set('timestamps', true)

module.exports = mongoose.model("Task", taskSchema);
