import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";

// Calendar imports
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
registerLocale("fr", fr);

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "react-datepicker/dist/react-datepicker.css";

import Select from "react-select";

import { addTask, updateTask} from "../utils/HandleApi";





const ModalTask =({ item }) => {

  console.log("item :", item);
  
  // Modals
  const [show, setShow] = useState(false);
  
  // Modal functions
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Date-picker
  const [taskDueDate, setTaskDueDate] = useState(new Date());
  
  // Task priority
  const [taskPriority, setTaskPriority] = useState("Moyenne");
  
  // Task Statut
  const [taskStatut, setTaskStatut] = useState("En attente");
  
  // Task State
  const radios = [
    { name: "En attente", value: "1", className: "outline-primary" },
    { name: "En cours", value: "2", className: "outline-danger" },
    { name: "Terminé", value: "3", className: "outline-success" },
  ];
  
  // Task Creator
  const [taskAssignedBy, setTaskAssignedBy] = useState({});
  
  // Task Assignment
  const [taskAssignment, setTaskAssignment] = useState([]);
  
  const [task, setTask] = useState(null);


  const [isUpdating, setIsUpdating] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

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
  useEffect(() => {
    setTask(item)
    setIsUpdating(!isUpdating)
    setTaskTitle(item.taskTitle)
    setTaskDesc(item.taskDesc)
    setTaskPriority(item.taskPriority)
    setTaskStatut(item.taskStatut)
    setTaskAssignedBy(item.taskAssignedBy)
    setTaskAssignment(item.taskAssignment)
  },[item])
  
  // useEffect(() => {
  //   handleShow()
  // },[task])



  console.log("TASK DATA :",  task );
  console.log("taskAssignedBy DATA :",  taskAssignedBy );
  console.log("taskAssignmentDATA :",  taskAssignment );

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ajouter une tâche
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {isUpdating ? (
            <Modal.Title>Modifier tâche</Modal.Title>
          ) : (
            <Modal.Title>Nouvelle tâche</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form className="was-validated">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Nom de la tâche :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Donner un titre à votre tâche ..."
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Renseigner une description ..."
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                required
              />
            </Form.Group>
          </Form>
          <>
            <br />
            <div className="taskItem d-flex justify-content-between mb-4 ">
              <p>Etat :</p>
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={radio.className}
                    name="radio"
                    value={radio.name}
                    checked={taskStatut === radio.name}
                    onChange={(e) => setTaskStatut(e.currentTarget.value)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>
            <div className="taskItem d-flex justify-content-between mb-4 align-items-center">
              <p className="align-self-center">Echéance:</p>

              <DatePicker
                locale="fr"
                dateFormat="dd/MM/yy"
                selected={taskDueDate}
                onChange={(date) => setTaskDueDate(date)}
              />
            </div>
            <div className="taskItem d-flex justify-content-between mb-4">
              <p>Importance :</p>
              <DropdownButton
                align="end"
                title={taskPriority ? taskPriority : "Priorité"}
                id="dropdown-menu-align-end"
                onSelect={(e) => setTaskPriority(e)}
                multiple={true}
              >
                <Dropdown.Item eventKey="basse">Basse</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="Moyenne">Moyenne</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey="Haute">Haute</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="taskItem d-flex justify-content-between mb-4">
              <label>Créer par:</label>
              <Select
                options={optionAssignments}
                onChange={(selectedOwnerOption) =>
                  setTaskAssignedBy(selectedOwnerOption)
                }
              />
            </div>
            <div className="taskItem d-flex justify-content-between mb-4">
              <label>Affécter à:</label>
              <Select
                options={optionAssignments}
                onChange={(selectedOption) => setTaskAssignment(selectedOption)}
                isMulti
              />
            </div>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={
              isUpdating
                ? () => {
                    updateTask(
                      taskId,
                      taskTitle,
                      // setTasks,
                      setTaskTitle,
                      setIsUpdating
                    );
                    handleClose();
                  }
                : () => {
                    addTask(
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
                      setTaskAssignment
                      // setTasks
                    );
                    handleClose();
                  }
            }
          >
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalTask;
