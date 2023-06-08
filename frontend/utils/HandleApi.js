import axios from "axios";
// convert format date
const format = (date, locale) => new Intl.DateTimeFormat(locale).format(date);

const baseUrl = "http://localhost:5001";

// TASK ZONE

const getTasks = (setTasks) => {
  axios.get(baseUrl).then(({ data }) => {
    data.map((el) => {
      el["createdAt"] = format(new Date(el.createdAt), "fr-FR");
      // el["dueDate"] = format(new Date(el.dueDate), "fr-FR");
      el["updatedAt"] = format(new Date(el.updatedAt), "fr-FR");
    });
    setTasks(data);
  });
};

const addTask = (newTask, setNewTask, setTasks, handleClose, originalTask) => {
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

const updateTask = (edited, setTasks, setIsUpdating) => {
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

// USER ZONE

const getUsers = (setUsers) => {
  axios
    .get(`${baseUrl}/users`).then(({ data }) => {
    console.log("1ere data from GET users :", data);
    setUsers(data);
  });
};

const addUser = (newUser, setNewUser, originalUser,handleClose) => {
  console.log("1ere data from new user :");
  axios.post(`${baseUrl}/register`, {
    username: newUser.username,
    email: newUser.email,
  })
  .then((data) => {
    console.log("cette data de addUser", data);
    setNewUser(originalUser)
    handleClose();
  })
};

const deleteUser = (_id, setUsers) => {
  console.log("l'ID est", _id);
  axios
    .post(`${baseUrl}/deleteUser`, { _id })
    .then((data) => {
      getUsers(setUsers);
    })
    .catch((err) => console.log(err));
};


export { getTasks, addTask, updateTask, deleteTask, getUsers, addUser, deleteUser };
