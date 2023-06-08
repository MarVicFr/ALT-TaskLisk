import { useEffect, useState } from "react";

// BootStrap imports
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

// Calendar imports
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";

// import { addTask, updateTask, addUser } from "../../utils/HandleApi";
import HandleTask from "./HandleTask";
import HandleUser from "./HandleUser";

const Handler = ({ tasks, setTasks, updateId, selectTasksState }) => {
  // Modal Handlers
  const [show, setShow] = useState(false);

  // Modals
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    // setIsUpdating(false);
  };

  // Original task
  const originalTask = {
    title: "",
    desc: "",
    state: 2,
    dueDate: "",
    priority: 2,
    createdBy: {},
    createdAt: new Date(),
    assignedTo: [],
  };

  // const originalUser = {
  //   username: "",
  //   email: "",
  // };

  // NewTask
  const [newTask, setNewTask] = useState(originalTask);
  const [editedTask, setEditedTask] = useState(originalTask);

  // User
  // const [newUser, setNewUser] = useState(originalUser);
  const [createUser, setCreateUser] = useState(false);

  useEffect(() => {
    tasks.map((task) => {
      if (task._id == updateId) {
        setEditedTask(task);
      }
    });
  }, [updateId]);

  // Task State
  const states = [
    { name: "En attente", value: 1, className: "outline-primary" },
    { name: "En cours", value: 2, className: "outline-warning" },
    { name: "Terminé", value: 3, className: "outline-success" },
    // { name: "Toutes", value: 4, className: "outline-success" },
  ];

  // Task Priority
  const priorities = [
    { name: "Basse", value: 7, className: "outline-info" },
    { name: "Moyenne", value: 8, className: "outline-secondary" },
    { name: "Haute", value: 9, className: "outline-danger" },
  ];

  const optionAssignments = [
    { value: "jack", label: "Jack" },
    { value: "paul", label: "Paul" },
    { value: "pierre", label: "Pierre" },
    { value: "joelle", label: "Joëlle" },
    { value: "romain", label: "Romain" },
    { value: "florian", label: "Florian" },
    { value: "marine", label: "Marine" },
    { value: "amine", label: "Amine" },
    { value: "carole", label: "Carole" },
  ];

  // Convert priority
  const priority = (item) => {
    const found = priorities.map((el) => {
      el.value === item;
      if (el.value === item) {
        const name = el.name;
        return name;
      }
    });
    return found;
  };

  return (
    <>
      {/* <Button
        variant="primary"
        className="m-2"
        onClick={() => {
          handleShow();
          if (createUser) setCreateUser(false);
        }}
      >
        Ajouter une tâche
      </Button> */}
      {/* <Button
        variant="danger"
        className="m-2"
        onClick={() => {
          setCreateUser(true);
          handleShow();
        }}
      >
        Nouvel utilisateur
      </Button> */}




    </>
  );
};

export default Handler;
