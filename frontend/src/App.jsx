import { useEffect, useState } from "react";
import "./App.css";
import Task from "../components/Task";
import { getTasks } from "../utils/HandleApi";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalTask from "../components/modal";

function App() {
  const [tasks, setTasks] = useState([]);

  // Modals
  const [show, setShow] = useState(false);

  // Modal functions
  const handleClose = () => {
    setShow(false);
    setIsUpdating(false);
  };
  const handleShow = () => setShow(true);

  // Update task
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState();

  // getTasks(setTasks);
  useEffect(() => {
    getTasks(setTasks);
  }, [getTasks]);
  console.log("mes tasks APP :", tasks);

  useEffect(() => {
    if (isUpdating) handleShow();
  }, [isUpdating]);

  return (
    <div className="app">
      <div className="container">
        <h1>ALT | Todo APP</h1>
        <div className="top">
          <ModalTask
            show={show}
            tasks={tasks}
            handleClose={handleClose}
            handleShow={handleShow}
            isUpdating={isUpdating}
            setIsUpdating={setIsUpdating}
            setTasks={setTasks}
            updateId={updateId}
            setUpdateId={setUpdateId}
          />
        </div>
        <div className="list">
          {tasks.length < 1
            ? "Aucune tâche enregistrée ..."
            : tasks.map((item) => (
                <Task
                  key={item._id}
                  item={item}
                  setTasks={setTasks}
                  isUpdating={isUpdating}
                  setIsUpdating={setIsUpdating}
                  updateId={updateId}
                  setUpdateId={setUpdateId}
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
