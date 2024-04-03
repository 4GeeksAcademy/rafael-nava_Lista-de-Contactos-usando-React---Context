import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import "../../styles/formulario.css";

export const ContactList = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate()


  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '', address:'' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verifica que los campos name y phone no estén vacíos antes de guardar
    if (newContact.name.trim() !== "" && newContact.phone.trim() !== "") {
      actions.addContact(newContact); // Utiliza actions.addContact para añadir un nuevo contacto
      setNewContact({ name: "", email: "", phone: "", address: "" });
      navigate("/demo");
    } else {
      alert("Por favor, completa los campos obligatorios: Nombre y Teléfono (*)");
    }
  };


  return (
    <div>
      <div className="formulario">
      <h1>Nuevos Contactos
      </h1>
      {/* <ul>
        {store.contacts.map(contact => ( // Utiliza store.contacts en lugar de contacts
          <li key={contact.id}>
            <Link to={`/contacts/${contact.id}`}>{contact.name}</Link>
          </li>
        ))}
      </ul> */}
      <form onSubmit={handleSubmit}>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Nombre (*)</span>
          <input type="text" name="name" value={newContact.name} onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
          <input type="text" name="email" value={newContact.email} onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Nro. Tlf (*)</span>
          <input type="number" name="phone" value={newContact.phone} onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="inputGroup-sizing-sm">Direccion</span>
          <input type="text" name="address" value={newContact.address} onChange={handleChange} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
        </div>
        <button type="submit" className="btn btn-outline-success" id="botonF">Success</button>
      </form>
      </div>
    </div>
  );
};
