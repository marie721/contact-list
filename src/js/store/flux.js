const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
			//Your data structures, A.K.A Entities
		},
		actions: {
			//(Arrow) Functions that update the Store
			// Remember to use the scope: scope.state.store & scope.setState()
			createContact: async newContactData => {
				const actions = getActions();
				newContactData["agenda_slug"] = "marie89";
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newContactData)
				});
				if (!response.ok) {
					return false;
				}
				await actions.getContacts();
				return true;
				// fetch("https://assets.breatheco.de/apis/fake/contact/", {
				// 	method: "POST",
				// 	headers: {
				// 		"Content-Type": "application/json"
				// 	},
				// 	body: JSON.stringify(newContactData)
				// })
				// 	.then(function(response) {
				// 		if (!response.ok) {
				// 			throw Error(response.statusText);
				// 		}
				// 		return response.json();
				// 	})
				// 	.then(function(contacts) {
				// 		actions.getContacts();
				// 	});
			},
			editContact: async editContactData => {
				const actions = getActions();
				// editContactData["agenda_slug"] = "marie89";
				let response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${editContactData.id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(editContactData)
				});
				if (!response.ok) {
					return false;
				}
				await actions.getContacts();
				return true;
			},
			getContacts: async () => {
				let response = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/marie89");
				if (!response.ok) {
					throw Error(response.statusText);
				}
				let contacts = await response.json();
				setStore({
					contacts: contacts
				});
			},
			handleDelete: async idToDelete => {
				let response = await fetch(`https://assets.breatheco.de/apis/fake/contact/${idToDelete}`, {
					method: "DELETE",

					headers: {
						"Content-Type": "application/json"
					}
				});
				if (!response.ok) {
					throw Error(response.statusText);
				}
				let actions = getActions();
				await actions.getContacts();
			}
		}
	};
};

export default getState;
