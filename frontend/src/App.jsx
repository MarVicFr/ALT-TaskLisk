import { useEffect, useState } from "react";
import "./App.css";
import Task from "../components/Task";
import { getTasks } from "../utils/HandleApi";
import "bootstrap/dist/css/bootstrap.min.css";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import HandleTask from "../components/modal/HandleTask";
import HandleUser from "../components/modal/HandleUser";

function App() {
  // Task
  const [tasks, setTasks] = useState([]);

  // Update task
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState();

  //  THIS PART NEED optimization !!

  // Task State
  const states = [
    { name: "En attente", value: 0, className: "outline-primary" },
    { name: "En cours", value: 1, className: "outline-warning" },
    { name: "Terminé", value: 2, className: "outline-success" },
    // { name: "Toutes", value: 4, className: "outline-success" },
  ];

  useEffect(() => {
    getTasks(setTasks);
  }, []);

  useEffect(() => {
    if (isUpdating) handleShow();
  }, [isUpdating]);

  return (
    <div className="app">
      <div className="container">
        <h1>ALT | Todo APP</h1>

        {/* Handle TASK & USERS */}
        <div className="d-flex justify-content-center">
          <HandleTask setTasks={setTasks} />
          <HandleUser />
        </div>

        {/* TOOLBAR STATES */}
        <ToggleButtonGroup
          type="checkbox"
          defaultValue={[1, 2, 3]}
          className="d-flex pt-3"
        >
          {states.map((el) => (
            <ToggleButton
              id={el.value}
              value={el.value}
              key={el.value}
              variant={el.className}
              onClick={() => selectTasksState(el.value)}
            >
              {el.name}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <div className="list">
          {
            // tasksFiltered.length > 0
            //   ? tasksFiltered.map((task) => (
            //       <Task
            //         key={task._id}
            //         item={task}
            //         setTasks={setTasks}
            //         isUpdating={isUpdating}
            //         setIsUpdating={setIsUpdating}
            //         updateId={updateId}
            //         setUpdateId={setUpdateId}
            //       />
            //     ))
            //   :
            tasks.map((item) => (
              <Task
                key={item._id}
                item={item}
                setTasks={setTasks}
                isUpdating={isUpdating}
                setIsUpdating={setIsUpdating}
                updateId={updateId}
                setUpdateId={setUpdateId}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
