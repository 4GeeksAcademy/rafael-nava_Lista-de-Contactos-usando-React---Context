import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	return (
		<div className="jumbotron">
			<hr className="my-4" />
			<h1 className="display-4">Nombre: {store.contacts[params.index].name}</h1>
			<h1 className="display-4">Email: {store.contacts[params.index].email}</h1>
			<h1 className="display-4">Nro. Tlf: {store.contacts[params.index].phone}</h1>
			<h1 className="display-4">Direccion: {store.contacts[params.index].address}</h1>
			<hr className="my-4" />
		</div>
	);
};

Single.propTypes = {
	match: PropTypes.object
};