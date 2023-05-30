import axios from "axios";
 // convert format date
 const format = (date, locale) => new Intl.DateTimeFormat(locale).format(date);


const baseUrl = "http://localhost:5001";

const getTasks = (setTasks) => {
  axios.get(baseUrl).then(({ data }) => {
    data.map((el)=> {
      el["createdAt"] = format(new Date(el.createdAt), "fr-FR")
      el["dueDate"] = format(new Date(el.dueDate), "fr-FR")
      el["updatedAt"] = format(new Date(el.updatedAt), "fr-FR")
    });
    setTasks(data);
  });
};

const addTask = (newTask, setTasks, handleClose, setNewTask, originalTask) => {
  console.log(" 1ere data de addTask : ", newTask);
  axios
    .post(`${baseUrl}/save`, {
      title: newTask.title,
      desc: newTask.desc,
      dueDate: newTask.dueDate,
      priority: newTask.priority,
      state: newTask.state,
      createdBy: newTask.createdBy,
      assignedTo: newTask.assignedTo,
    })
    .then((data) => {
      console.log("cette data de addTask : ", data);
      getTasks(setTasks);
      setNewTask(originalTask);
      handleClose();
    })

    .catch((err) => console.log(err));
};

// TO FIX

const updateTask = (
  edited,
  setTasks,
  setIsUpdating,
) => {
  axios
    .post(`${baseUrl}/update`, {
      _id: edited._id,
      title: edited.title,
      desc: edited.desc,
      dueDate: edited.dueDate,
      priority: edited.priority,
      state: edited.state,
      createdBy: edited.createdBy,
      assignedTo: edited.assignedTo,
    })
    .then((data) => {
      console.log("cette data de update : ", data);
      getTasks(setTasks);
      setIsUpdating(false);
    })
    .catch((err) => console.log(err));
};

const deleteTask = (_id, setTasks) => {
  axios
    .post(`${baseUrl}/delete`, { _id })
    .then((data) => {
      getTasks(setTasks);
    })
    .catch((err) => console.log(err));
};

export { getTasks, addTask, updateTask, deleteTask };
