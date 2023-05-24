import { useEffect, useState } from "react";
import "./App.css";
import Task from "../components/Task";
import { getTasks, deleteTask } from "../utils/HandleApi";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalTask from "../components/modal";

function App() {
  const [tasks, setTasks] = useState([]);
  // const [isUpdating, setIsUpdating] = useState(false);
  // const [taskId, setTaskId] = useState("");
  const [dataFromItem, setDataFromItem] = useState([]);



  const updateMode = ({item}) => {
    setDataFromItem(item)
  };
  console.log("dataFromItem : ", dataFromItem);

  useEffect(() => {
    getTasks(setTasks);
  }, []);
  console.log("mes tasks :", tasks);
  
  return (
    <div className="app">
      <div className="container">
        <h1>ALT | Todo APP</h1>
        <div className="top">
          <ModalTask 
            item={dataFromItem}
          />
        </div>
        <div className="list">
          {tasks.map((item) => (
            <Task
              key={item._id}
              item={item}
              updateMode={() => updateMode({item})}
              deleteTask={() => deleteTask(item._id, setTasks)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
