import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

export const Demo = () => {
    const { store, actions } = useContext(Context);
    const [editingContact, setEditingContact] = useState(null); // Estado para almacenar el contacto en edición
    const [newContact, setNewContact] = useState({ name: "", email: "", phone: "", address: "" });

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
    };

    const handleDeleteContact = (id) => {
        actions.deleteContact(id);
    };

    return (
        <div className="container">
            <h1>Contact List</h1>
            <ul className="list-group">
                {store.contacts.map((contact, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        <Link to={`/single/${contact.id}`}>
                            <h3>{contact.name}</h3>
                        </Link>
                        <div>
                            <button className="btn btn-success" onClick={() => handleEditContact(contact)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Editar contacto
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDeleteContact(contact.id)}>
                                Eliminar contacto
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            
            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Editar Contacto</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="name" name="name" value={newContact.name} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={newContact.email} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Teléfono</label>
                                    <input type="text" className="form-control" id="phone" name="phone" value={newContact.phone} onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Dirección</label>
                                    <input type="text" className="form-control" id="address" name="address" value={newContact.address} onChange={handleChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Guardar cambios</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
