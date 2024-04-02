import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
		<nav className="navbar navbar-light bg-light mb-3">
			<Link to="/">
				<button className="btn btn-primary">Back home</button>
			</Link>
			<div className="ml-auto">
				<Link to="/demo">
					<button className="btn btn-primary">Check the list</button>
				</Link>
			</div>
			<div>
			<Link to="/formulario">
			<button className="btn btn-primary" >Add Contact</button>
			</Link>
			</div>
		</nav>
		</>
	);
};
