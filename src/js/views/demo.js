import React, { useState, useContext } from "react";
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContact({ ...newContact, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingContact) {
            actions.editContact(editingContact.id, newContact);
            setEditingContact(null); // Después de editar, restablece el estado de edición
        } else {
            actions.addContact(newContact);
        }
        setNewContact({ name: "", email: "", phone: "", address: "" });
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
        }
    };

    const cancelDelete = () => {
        setDeletingContact(null);
    };

    return (
        <div className="container">
            <h1>Lista de contactos</h1>
            <ul className="list-group">
                {store.contacts.map((contact, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between"
                    >
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
                        <div>
                            <button
                                className="btn btn-success"
                                onClick={() => handleEditContact(contact)}
                            >
                                Editar contacto
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => handleDeleteConfirmation(contact)}
                                data-bs-toggle="modal"
                                data-bs-target="#deleteModal"
                            >
                                Eliminar contacto
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

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
                                        Nombre
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
                                        Teléfono
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
