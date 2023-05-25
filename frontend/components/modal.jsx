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

import { addTask, updateTask } from "../utils/HandleApi";

const ModalTask = ({
  tasks,
  show,
  handleClose,
  handleShow,
  isUpdating,
  setIsUpdating,
}) => {
  console.log("tasks :", tasks);


  // Date-picker
  const [dueDate, setDueDate] = useState(new Date());

  // Task priority
  const [priority, setPriority] = useState(2);

  // Task Statut
  const [statut, setStatut] = useState(2);


  // Task State
  const radios = [
    { name: "En attente", value: 1, className: "outline-primary" },
    { name: "En cours", value: 2, className: "outline-danger" },
    { name: "Terminé", value: 3, className: "outline-success" },
  ];

  // Task Creator
  const [assignedBy, setAssignedBy] = useState({});

  // Task Assignment
  const [assignment, setAssignment] = useState([]);

  // const [task, setTask] = useState(null);

  // const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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

  // console.log("taskStatut :", taskStatut);

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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
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
                    id={radio.value}
                    type="radio"
                    variant={radio.className}
                    name="radio"
                    value={radio.name}
                    checked={statut === radio.value}
                    onChange={(e) => setStatut(e.currentTarget.id)}
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
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
              />
            </div>
            <div className="taskItem d-flex justify-content-between mb-4">
              <p>Importance :</p>
              <DropdownButton
                align="end"
                title={priority ? priority : "Priorité"}
                id="dropdown-menu-align-end"
                onSelect={(e) => setPriority(e)}
                multiple={true}
              >
                <Dropdown.Item name="Moyenne" eventKey={1}>Basse</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey={2} active>Moyenne</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item eventKey={3}>Haute</Dropdown.Item>
              </DropdownButton>
            </div>
            <div className="taskItem d-flex justify-content-between mb-4">
              <label>Créer par:</label>
              <Select
                options={optionAssignments}
                onChange={(selectedOwnerOption) =>
                  setAssignedBy(selectedOwnerOption)
                }
              />
            </div>
            <div className="taskItem d-flex justify-content-between mb-4">
              <label>Affécter à:</label>
              <Select
                options={optionAssignments}
                onChange={(selectedOption) => setAssignment(selectedOption)}
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
                  // TO FIX
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
                      setAssignment
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
};

export default ModalTask;
