import React, { useEffect, useState } from "react";
import { getUsers, addUser, deleteUser } from "../../utils/HandleApi";
import '../modal/handleUser.css';

// BootStrap
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Bootstrap icons
import { BsTrash3, BsFillPencilFill } from 'react-icons/bs';


const HandleUser = () => {
  // Modal Handlers
  const [show, setShow] = useState(false);
  // Modals
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
    setIsUpdating(false);
  };

  const originalUser = {
    username: "",
    email: "",
  };
  

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(originalUser);
  const [createUser, setCreateUser] = useState(false);
  const [newUser, setNewUser] = useState(originalUser);

  const [isUpdating, setIsUpdating] = useState(false);


  useEffect(() => {
    getUsers(setUsers);
  }, [setUsers]);

  console.log("USERS :", users);

  return (
    <div>
      <Button
        variant="danger"
        className="m-2"
        onClick={() => {
          setCreateUser(true);
          handleShow();
        }}
      >
        Gerer utilisateurs
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {isUpdating ? (
            <Modal.Title>Modifier utilisateur</Modal.Title>
          ) : (
            <Modal.Title>Ajouter utilisateur</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form className="was-validated">
            <Form.Group className=" justify-content-between mb-4 ">
              <Form.Label>Utilisateur:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pierre, Paul ou Jacques ?"
                value={newUser.username}
                onChange={(e) => {
                  setNewUser((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }));
                }}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="  justify-content-between mb-4 ">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="email@example.com"
                value={newUser.email}
                onChange={(e) => {
                  setNewUser((prevState) => ({
                    ...prevState,
                    email: e.target.value,
                  }));
                }}
                required
              />
            </Form.Group>
          </Form>
          <div className="container">
            <h2>Gestionnaire Utilisateurs</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                <tr className="text-truncate" id={index} >
                  <td>{user.username}</td>
                  <td className="text-truncate">{user.email}</td>
                  <td className="d-flex justify-content-around">
                    <button className="btn btn-sm btn-primary"><BsFillPencilFill /></button>
                    <button className="btn btn-sm btn-danger ms-7" onClick={()=> deleteUser(user._id, setUsers)}>
                      <BsTrash3 />
                    </button>
                  </td>
                </tr>
                
                ))}
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Annuler
          </Button>
          <Button
            variant="danger"
            onClick={() =>
              addUser(newUser, setNewUser, originalUser, handleClose)
            }
          >
            {isUpdating ? "Mettre à jour" : "Ajouter"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HandleUser;
