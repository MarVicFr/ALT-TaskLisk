import React from "react";
import { deleteTask } from "../utils/HandleApi";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import "../components/task.css";

const Task = ({ item }) => {
  
  // convert format date
  const format = (date, locale) => new Intl.DateTimeFormat(locale).format(date);
  
  // Task State
  const radios = [
    { name: "En attente", value: 1, className: "outline-primary" },
    { name: "En cours", value: 2, className: "outline-danger" },
    { name: "Terminé", value: 3, className: "outline-success" },
  ];
  // Task Priority
  const priorities = [
    { name: "Basse", value: 1 },
    { name: "Moyenne", value: 2 },
    { name: "Haute", value: 3 }
  ];
  
  // Convert State
  const statut = (item) =>
    radios.map((el) => {
      if (item.statut === el.value) return el.name;
    })

  // Convert priority
  const priority = (item) =>
  priorities.map((el) => {
      if (item.priority === el.value) return el.name;
    })



  // console.log("item.createdAt :",item.createdAt);
  // console.log("item.updated :",item.updated);

  return (
    <div className="task">
      <div className="fs-5">Titre de la tâche :{item.title}</div>
      <div className="text">Description :{item.desc}</div>
      <div className="fs-6">Créée le :{format(new Date(item.createdAt), 'fr-FR')}</div>
      {item.createdAt === item.updated ? null : (
        <div className="text">Mise à jour le :{format(new Date(item.updatedAt), 'fr-FR')}</div>
        )}
        <div className="fs-6">Echéance au :{format(new Date(item.dueDate), 'fr-FR')}</div>
      <div className="text">Importance :{priority(item)}</div>
      <div className="text">Statut :{statut(item)}</div>
      <div className="icons">
        <BiEdit
          className="icon"
          // onClick={updateTask(item._id)}
        />
        <AiFillDelete
          className="icon"
          // onClick={deleteTask(item._id)}
        />
      </div>
    </div>
  );
};

export default Task;
