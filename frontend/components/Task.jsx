import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import "../components/task.css";

const Task = ({ item, updateMode, deleteTask }) => {

  console.log("item.createdAt :",item.createdAt);
  console.log("item.updated :",item.updated);

  return (
    <div className="task">
      <div className="fs-5">Titre de la tâche :{item.taskTitle}</div>
      <div className="text">Description :{item.taskDesc}</div>
      <div className="fs-6">Date de création :{item.createdAt}</div>
      <div className="text">Importance :{item.taskPriority}</div>
      <div className="text">Statut :{item.taskStatut}</div>
      {item.createdAt === item.updated ? (
        null
        ) : (
          <div className="text">Mise à jour :{item.updatedAt}</div>
      )}
      <div className="icons">
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteTask} />
      </div>
    </div>
  );
};

export default Task;
