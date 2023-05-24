const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTask = async (req, res) => {
  const {
    taskTitle,
    taskDesc,
    taskPriority,
    taskStatut,
    taskDueDate,
    taskAssignedBy,
    taskAssignment,
  } = req.body;

  TaskModel.create({
    taskTitle,
    taskDesc,
    taskPriority,
    taskStatut,
    taskDueDate,
    taskAssignedBy,
    taskAssignment,
  }).then((data) => {
    console.log("Added Sucessfully");
    console.log("this is data", data);
    res.send(data);
  });
};

module.exports.updateTask = async (req, res) => {
  const { _id, text } = req.body;
  TaskModel.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Updated successfully !"))
    .catch((err) => console.log(err));
};

module.exports.deleteTask = async (req, res) => {
  const { _id } = req.body;
  TaskModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted successfully !"))
    .catch((err) => console.log(err));
};
