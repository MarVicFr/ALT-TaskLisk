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
  setTasks,
  updateId,
}) => {
  console.log("Mes tasks MODAL :", tasks);

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

  // NewTask
  const [newTask, setNewTask] = useState(originalTask);
  const [editedTask, setEditedTask] = useState(originalTask);

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
  ];

  // Task Priority
  const priorities = [
    { name: "Basse", value: 1, className: "outline-info" },
    { name: "Moyenne", value: 2, className: "outline-secondary" },
    { name: "Haute", value: 3, className: "outline-danger" },
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

  // Convert State
  const statut = (item) =>
    radios.map((el) => {
      if (item.state === el.value) return el.name;
    });

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

  console.log("editedTask.createdBy.label", editedTask.createdBy.label);

  return (
    <>
      <Button variant="primary" className="m-2" onClick={handleShow}>
        Ajouter une tâche
      </Button>
      <ButtonGroup style={{display: 'flex'}}>
      <Button variant="info">En attente</Button>
        <Button variant="warning">En cours</Button>
        <Button variant="success">Terminée</Button>
      </ButtonGroup>
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
            <Form.Group className="taskItem d-flex justify-content-between mb-4 ">
              <Form.Label>Nom de la tâche :</Form.Label>
              <Form.Control
                type="text"
                placeholder="Donner un titre à votre tâche ..."
                value={isUpdating ? editedTask.title : newTask.title}
                onChange={(e) => {
                  isUpdating
                    ? setEditedTask((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }))
                    : setNewTask((prevState) => ({
                        ...prevState,
                        title: e.target.value,
                      }));
                }}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description :</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Renseigner une description ..."
                value={isUpdating ? editedTask.desc : newTask.desc}
                onChange={(e) => {
                  isUpdating
                    ? setEditedTask((prevState) => ({
                        ...prevState,
                        desc: e.target.value,
                      }))
                    : setNewTask((prevState) => ({
                        ...prevState,
                        desc: e.target.value,
                      }));
                }}
                required
              />
            </Form.Group>
            <br />
            <Form.Group className="taskItem d-flex justify-content-between mb-4 ">
              <p>Etat :</p>
              <ButtonGroup>
                {states.map((state, idx) => (
                  <ToggleButton
                    key={idx}
                    id={state.value}
                    type="radio"
                    name="radio1"
                    value={state.name}
                    checked={
                      isUpdating
                        ? editedTask.state === state.value
                        : newTask.state === state.value
                    }
                    variant={state.className}
                    required
                    onChange={(event) =>
                      isUpdating
                        ? setEditedTask((prevState) => ({
                            ...prevState,
                            state: parseInt(event.target.id),
                          }))
                        : setNewTask((prevState) => ({
                            ...prevState,
                            state: parseInt(event.target.id),
                          }))
                    }
                  >
                    {state.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </Form.Group>
            <Form.Group className="taskItem d-flex justify-content-between mb-4 align-items-center">
              <p className="align-self-center">Echéance:</p>

              <DatePicker
                locale="fr"
                dateFormat="dd/MM/yy"
                selected={newTask.dueDate}
                onChange={(date) => {
                  isUpdating
                    ? setEditedTask((prevState) => ({
                        ...prevState,
                        dueDate: date,
                      }))
                    : setNewTask((prevState) => ({
                        ...prevState,
                        dueDate: date,
                      }));
                }}
              />
            </Form.Group>

            <Form.Group className="taskItem d-flex justify-content-between mb-4">
              <p>Priorité : </p>
              <DropdownButton
                align="start"
                title={priority(editedTask.priority)}
                id="dropdown-menu-align-end"
                required
              >
                {priorities.map((priority, idx) => {
                  return (
                    <Dropdown.Item
                      key={idx}
                      id={priority.value}
                      type="radio"
                      variant={priority.className}
                      name="priorite"
                      value={priority.name}
                      checked={
                        isUpdating
                          ? editedTask.priority === priority.value
                          : newTask.priority === priority.value
                      }
                      required
                      onClick={(e) => {
                        isUpdating
                          ? setEditedTask((prevState) => ({
                              ...prevState,
                              priority: e.target.id,
                            }))
                          : setNewTask((prevState) => ({
                              ...prevState,
                              priority: e.target.id,
                            }));
                      }}
                    >
                      {priority.name}
                    </Dropdown.Item>
                  );
                })}
              </DropdownButton>
            </Form.Group>

            <Form.Group className="taskItem d-flex justify-content-between mb-4">
              <label>Créer par:</label>
              <Select
                // value={editedTask.createdBy.label }
                options={optionAssignments}
                onChange={(selectedOwnerOption) => {
                  setNewTask((prevState) => ({
                    ...prevState,
                    createdBy: selectedOwnerOption,
                  }));
                }}
                required
              />
            </Form.Group>
            <Form.Group className="taskItem d-flex justify-content-between mb-4">
              <label>Affécter à:</label>
              <Select
                options={optionAssignments}
                onChange={(selectedOption) => {
                  isUpdating
                    ? setEditedTask((prevState) => ({
                        ...prevState,
                        assignedTo: selectedOption,
                      }))
                    : setNewTask((prevState) => ({
                        ...prevState,
                        assignedTo: selectedOption,
                      }));
                }}
                isMulti
                required
              />
            </Form.Group>
            {/* </Form> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={
              isUpdating
                ? () =>
                    updateTask(editedTask, setTasks, handleClose, originalTask)
                : () =>
                    addTask(
                      newTask,
                      setTasks,
                      handleClose,
                      setNewTask,
                      originalTask,
                      setIsUpdating
                    )
            }
          >
            {isUpdating ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalTask;
