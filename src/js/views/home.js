import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import contactLogo from "../../img/Contacts_logo.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

  return(
    <>
    <div className="home">
  <div className="text-center mt-5">
    <img src={contactLogo} />
    </div>
      <div class="card-body"><p className="display-6">Cantidad de contactos: {store.contacts.length}</p></div>
  </div>
  </>
);}
