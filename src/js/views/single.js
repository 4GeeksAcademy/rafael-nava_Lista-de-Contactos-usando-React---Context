import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/single.css";

export const Single = (props) => {
  const { store, actions } = useContext(Context);
  const params = useParams();
  return (
    <div className="jumbotron">
    <h1 className="display-6">
        <span className="text-lightgray">
            <i className="far fa-user-circle"></i>{" "}
            Nombre:
        </span>{" "}
        {store.contacts[params.index].name}
    </h1>
    <h1 className="display-6">
        <span className="text-lightgray">
            <i className="far fa-envelope"></i>{" "}
            Email:
        </span>{" "}
        {store.contacts[params.index].email}
    </h1>
    <h1 className="display-6">
        <span className="text-lightgray">
            <i className="fas fa-mobile-alt"></i>{" "}
            Nro. Tlf:
        </span>{" "}
        {store.contacts[params.index].phone}
    </h1>
    <h1 className="display-6">
        <span className="text-lightgray">
            <i className="fas fa-map-marker-alt"></i>{" "}
            Dirección:
        </span>{" "}
        {store.contacts[params.index].address}
    </h1>
</div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};
