import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext.js";

export const Contacts = () => {
	const [state, setState] = useState({
		showModal: false,
		contactId: null
	});

	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link className="btn btn-success" to="/add">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contacts.map(contactInfo => {
							return (
								<ContactCard
									key={contactInfo.id}
									contactInfo={contactInfo}
									onDelete={() => setState({ showModal: true, contactId: contactInfo.id })}
								/>
							);
						})}
					</ul>
				</div>
			</div>
			<Modal
				idToDelete={state.contactId}
				show={state.showModal}
				onClose={() => setState({ showModal: false, contactId: null })}
			/>
		</div>
	);
};
