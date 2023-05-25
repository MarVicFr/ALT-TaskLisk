const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTask = async (req, res) => {
  const {
    title,
    desc,
    priority,
    statut,
    dueDate,
    assignedBy,
    assignment,
  } = req.body;

  TaskModel.create({
    title,
    desc,
    priority,
    statut,
    dueDate,
    assignedBy,
    assignment,
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
