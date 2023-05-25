import { useEffect, useState } from "react";
import "./App.css";
import Task from "../components/Task";
import { getTasks } from "../utils/HandleApi";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalTask from "../components/modal";

function App() {
  const [tasks, setTasks] = useState([]);
  // const [isUpdating, setIsUpdating] = useState(false);
  // const [taskId, setTaskId] = useState("");
  // const [dataFromItem, setDataFromItem] = useState([]);

  // const updateTask = ({item}) => {
  //   // setDataFromItem(item)
  //   console.log("dataFromItem item._ID : ", item._id);
  // };

  // Modals
  const [show, setShow] = useState(false);

  // Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Update task
  const [isUpdating, setIsUpdating] = useState(false);

  // getTasks(setTasks);
  useEffect(() => {
    getTasks(setTasks);
  }, [getTasks]);
  console.log("mes tasks :", tasks);

  return (
    <div className="app">
      <div className="container">
        <h1>ALT | Todo APP</h1>
        <div className="top">
          <ModalTask show={show} tasks={tasks} handleClose={handleClose} handleShow={handleShow} isUpdating={isUpdating} setIsUpdating={setIsUpdating} />
        </div>
        <div className="list">
          {tasks.map((item) => (
            <Task
              key={item._id}
              item={item}
              // updateTask={() => updateTask({item})}
              // deleteTask={() => deleteTask(item._id, setTasks)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
