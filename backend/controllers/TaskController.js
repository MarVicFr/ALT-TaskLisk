const TaskModel = require("../models/TaskModel");

module.exports.getTasks = async (req, res) => {
  const task = await TaskModel.find();
  res.send(task);
};

module.exports.saveTask = async (req, res) => {
  const { title, desc, priority, state, dueDate, createdBy, assignedTo } =
    req.body;

  TaskModel.create({
    title,
    desc,
    priority,
    state,
    dueDate,
    createdBy,
    assignedTo,
  }).then((data) => {
    console.log("Added Sucessfully");
    console.log("this is data from CONTROLLER :", data);
    res.send(data);
  });
};

module.exports.updateTask = async (req, res) => {
  const { _id, title, desc, priority, state, dueDate, createdBy, assignedTo } =
    req.body;
  TaskModel.findByIdAndUpdate(_id, {
    title,
    desc,
    priority,
    state,
    dueDate,
    createdBy,
    assignedTo,
  })
    .then(() => res.send("Updated successfully !"))
    .catch((err) => console.log(err));
};

module.exports.deleteTask = async (req, res) => {
  const { _id } = req.body;
  TaskModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted successfully !"))
    .catch((err) => console.log(err));
};
