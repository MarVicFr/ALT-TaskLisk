import axios from "axios";

const baseUrl = "http://localhost:5001";

const getTasks = (setTasks) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("voici la data =>", data);
    setTasks(data);
  });
};

const addTask = (
  taskTitle,
  setTaskTitle,
  taskDesc,
  setTaskDesc,
  taskPriority,
  setTaskPriority,
  taskStatut,
  setTaskStatut,
  taskDueDate,
  setTaskDueDate,
  taskAssignedBy,
  setTaskAssignedBy,
  taskAssignment,
  setTaskAssignment,
//   setTasks
) => {
  axios
    .post(`${baseUrl}/save`, {
      taskTitle,
      taskDesc,
      taskPriority,
      taskStatut,
      taskDueDate,
      taskAssignedBy,
      taskAssignment,
    //   setTasks
    })
    .then((data) => {
      console.log("cette data : ", data);
      setTaskTitle("");
      setTaskDesc("");
      setTaskPriority("Moyenne");
      setTaskStatut("En attente");
      setTaskDueDate(new Date());
      setTaskAssignedBy({});
      setTaskAssignment([]);
      getTasks(setTasks);
    })
    .catch((err) => console.log(err));
};

const updateTask = (taskId, text, setTasks, setText, setIsloading) => {
  axios
    .post(`${baseUrl}/update`, { _id: taskId, text })
    .then((data) => {
      console.log("cette data : ", data);
      setText("");
      setIsloading(false);
      getTasks(setTasks);
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
