import { v4 as uuidv4 } from "uuid";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [
        {
          id: uuidv4(), // Agregamos un ID único para el contacto inicial
          name: "rafael",
          email: "asdsa@gmail.com",
          phone: "23423",
          address: "valencia",
        },
      ],
    },
    actions: {
      // exampleFunction: () => {
      // 	getActions().changeColor(0, "green");
      // },
      // loadSomeData: () => {
      // 	/**
      // 		fetch().then().then(data => setStore({ "foo": data.bar }))
      // 	*/
      // },
      // changeColor: (index, color) => {
      // 	const store = getStore();
      // 	const demo = store.demo.map((elm, i) => {
      // 		if (i === index) elm.background = color;
      // 		return elm;
      // 	});
      // 	setStore({ demo: demo });
      // },
      addContact: (newContact) => {
        const store = getStore();
        const updatedContacts = [
          ...store.contacts,
          { ...newContact, id: uuidv4() },
        ];
        setStore({ contacts: updatedContacts });
      },
      editContact: (id, updatedContact) => {
        const store = getStore();
        const updatedContacts = store.contacts.map((contact) => {
          if (contact.id === id) {
            return { ...contact, ...updatedContact };
          }
          return contact;
        });
        setStore({ contacts: updatedContacts });
      },
      deleteContact: (id) => {
        const store = getStore();
        const updatedContacts = store.contacts.filter(
          (contact) => contact.id !== id
        );
        setStore({ contacts: updatedContacts });
      },
    },
  };
};

export default getState;
