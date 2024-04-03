import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [editingContact, setEditingContact] = useState(null); // Estado para almacenar el contacto en edición
  const [deletingContact, setDeletingContact] = useState(null); // Estado para almacenar el contacto en eliminación
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // para que se carguen todos los contactos cuandon se abra la ventana
  useEffect(() => {
    actions.loadContacts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica que los campos name y phone no estén vacíos antes de guardar
    if (newContact.name.trim() !== "" && newContact.phone.trim() !== "") {
      if (editingContact) {
        actions.editContact(editingContact.id, newContact);
        setEditingContact(null); // Después de editar, restablece el estado de edición
      } else {
        actions.addContact(newContact);
      }
      setNewContact({ name: "", email: "", phone: "", address: "" });
    } else {
      alert("Por favor, completa los campos obligatorios: Nombre y Teléfono (*)");
    }
  };
  

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setNewContact(contact);
    // Abre el modal de edición
    const modal = new bootstrap.Modal(document.getElementById("exampleModal"));
    modal.show();
  };

  const handleDeleteConfirmation = (contact) => {
    setDeletingContact(contact);
  };

  const confirmDelete = () => {
    if (deletingContact) {
      actions.deleteContact(deletingContact.id);
      setDeletingContact(null); // Después de eliminar, restablece el estado de eliminación
      window.location.reload(); // para recarcar la ventana ya que cuando se elimina de la api no se actualiza automaticamente el html
    }
  };

  const cancelDelete = () => {
    setDeletingContact(null);
  };

  return (
    <div className="container">
      <h1>Lista de contactos</h1>
      <div
        className="list-group list-group-flush overflow-auto"
        style={{ height: "400px" }} // Altura fija para el desplazamiento
        id="scrollspy-example"
        data-bs-spy="scroll"
        data-bs-target="#list-example"
        data-bs-offset="0"
        tabIndex="0"
      >
        <ul className="list-group" id="list-example">
          {store.contacts.map((contact, index) => (
            <li
              key={index}
              className="list-group-item"
            >
              <div className="row" id="divListaContatactos">
              <div id="divContactoList">
              <Link
                to={"/single/" + index}
                style={{ textDecoration: "none", color: "lightgray" }}
                onMouseOver={(e) => (e.target.style.color = "darkgray")}
                onMouseOut={(e) => (e.target.style.color = "lightgray")}
              >
                <h3>
                  <span>
                    <i className="far fa-user"></i> {contact.name}
                  </span>
                </h3>
              </Link>
              </div>
              <div id="divBotonesLista">
                <button
                  className="btn btn-success botonesContactos"
                  onClick={() => handleEditContact(contact)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger botonesContactos"
                  onClick={() => handleDeleteConfirmation(contact)}
                  data-bs-toggle="modal"
                  data-bs-target="#deleteModal"
                >
                  Eliminar
                </button>
              </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal de Edición */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Editar Contacto
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nombre (*)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={newContact.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={newContact.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Teléfono (*)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={newContact.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Dirección
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={newContact.address}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Guardar cambios
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmación de Eliminación */}
      <div
        className="modal fade"
        id="deleteModal"
        tabIndex="-1"
        aria-labelledby="deleteModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteModalLabel">
                Confirmar Eliminación
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {deletingContact && (
                <p>
                  ¿Estás seguro de que quieres eliminar a {deletingContact.name}
                  ?
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={cancelDelete}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
