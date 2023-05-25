import axios from "axios";

const baseUrl = "http://localhost:5001";

const getTasks = (setTasks) => {
  axios.get(baseUrl).then(({ data }) => {
    console.log("voici la data de getTasks =>", data);
    setTasks(data);
  });
};

const addTask = (
  title,
  setTitle,
  desc,
  setDesc,
  priority,
  setPriority,
  statut,
  setStatut,
  dueDate,
  setDueDate,
  assignedBy,
  setAssignedBy,
  assignment,
  setAssignment,
  setTasks
) => {
  axios
    .post(`${baseUrl}/save`, {
      title,
      desc,
      priority,
      statut,
      dueDate,
      assignedBy,
      assignment,
    })
    .then((data) => {
      console.log("cette data de addTask : ", data);
      setTitle("");
      setDesc("")
      setPriority(null);
      setStatut(null);
      setDueDate(new Date());
      setAssignedBy({});
      setAssignment([]);
      // setTasks(data);
      getTasks(()=> setTasks())
    }
    )

    .catch((err) => console.log(err));
};

// TO FIX

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
