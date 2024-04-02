import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const [valor, setValor] = useState({});
	const { store, actions } = useContext(Context);
	const { id } = useParams
	const params = useParams(id);
	
	const validar = () =>{
		let  contactos = store.contacts 
		setValor(contactos)
	};
	console.log(store.contacts);
console.log(contactos);
console.log(setValor);
console.log(valor);

	useEffect ( () => {
		validar();
	},[store.contacts])
	

	return (
		<div className="jumbotron">
			{/* <h4 className="display-4">Nombre: {store.contacts[params.id].name}</h4> */}
			<h4 className="display-4">Nombre: {valor.name}</h4>
			{/* <h4 className="display-4">Email: {store.contacts[params.theid].email}</h4>
			<h4 className="display-4">Nro. Tlf: {store.contacts[params.theid].phone}</h4>
			<h4 className="display-4">Direccion: {store.contacts[params.theid].address}</h4> */}
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};

// preguntar como funciona el protypes