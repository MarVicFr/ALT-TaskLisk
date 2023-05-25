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
  statut: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    required: true,
  },
  assignedBy: {
    type: Object,
    required: true,
  },
  assignment: {
    type: [{}],
    required: true,
  },
});

// Generate "createdAt & updateAt"
taskSchema.set('timestamps', true)

module.exports = mongoose.model("Task", taskSchema);
