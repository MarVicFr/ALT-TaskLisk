const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskTitle: {
    type: String,
    required: true,
  },
  taskDesc: {
    type: String,
    required: true,
  },
  taskPriority: {
    type: String,
    required: true,
  },
  taskStatut: {
    type: String,
    required: true,
  },
  taskDueDate: {
    type: String,
    required: true,
  },
  taskAssignedBy: {
    type: Object,
    required: true,
  },
  taskAssignment: {
    type: [{}],
    required: true,
  },
});

// Generate "createdAt & updateAt"
taskSchema.set('timestamps', true)

module.exports = mongoose.model("Task", taskSchema);
