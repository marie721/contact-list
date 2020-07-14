import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	async function handleSubmit(event) {
		event.preventDefault();
		event.stopPropagation();
		console.log("submit here");
		var newContactData = {
			full_name: fullName,
			email: email,
			phone: phone,
			address: address,
			id: props.match.params.contactId
		};
		console.log(`this is the object ${newContactData}`);
		let success = await actions.editContact(newContactData);
		if (success) {
			history.push("/");
		} else {
			alert("Check your input and try again");
		}
	}
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	var history = useHistory();
	useEffect(() => {
		console.log("running effect");
		for (let contact of store.contacts) {
			if (contact.id == props.match.params.contactId) {
				console.log(contact.id);
				setFullName(contact.full_name);
				setEmail(contact.email);
				setPhone(contact.phone);
				setAddress(contact.address);
			}
		}
	}, [store.contacts]);
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit contact</h1>
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={fullName}
							onChange={event => setFullName(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={email}
							onChange={event => setEmail(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={phone}
							onChange={event => setPhone(event.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={address}
							onChange={event => setAddress(event.target.value)}
						/>
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};
EditContact.propTypes = {
	match: PropTypes.object
};
