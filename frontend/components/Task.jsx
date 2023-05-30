import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import "../components/task.css";
import { deleteTask } from "../utils/HandleApi";

const Task = ({ item, setTasks, setIsUpdating, isUpdating, updateId, setUpdateId }) => {

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
    { name: "Haute", value: 3 },
  ];

  // Convert State
  const statut = (item) =>
    radios.map((el) => {
      if (item.state === el.value) return el.name;
    });

  // Convert priorityTask
  const priority =  (item) => {
    const found = priorities.map((el) => {
      el.value === item;
      if (el.value === item)  
      {
        const name = el.name
        return name
      }
    })
    return found;
  };

    
  return (
    <div className="task">
      <div className="fs-5">Titre de la tâche :{item.title}</div>
      <div className="text">Description :{item.desc}</div>
      <div className="fs-6">
        Créée le :{item.createdAt}
      </div>
      {item.createdAt === item.updated ? null : (
        <div className="text">
          Mise à jour le :{item.updatedAt}
        </div>
      )}
      <div className="fs-6">
        {/* Echéance au :{format(new Date(item.dueDate), "fr-FR")} */}
        Echéance au :{item.dueDate}
      </div>
      <div className="text">Importance :{priority(item.state)}</div>
      <div className="text">Statut :{statut(item)}</div>
      <div className="icons">
        <BiEdit
          className="icon"
          onClick={() => {
            setIsUpdating(!isUpdating)
            setUpdateId(item._id)
          }}
        />
        <AiFillDelete
          className="icon"
          onClick={()=> deleteTask(item._id, setTasks)}
        />
      </div>
    </div>
  );
};

export default Task;
