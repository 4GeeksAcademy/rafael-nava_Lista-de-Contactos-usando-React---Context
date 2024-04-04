import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
    },
    actions: {
      loadContacts: async () => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/rafael-nava/contacts`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `No se pudieron recuperar los datos: ${response.statusText}`
            );
          }
          let data = await response.json();
          setStore({ contacts: data.contacts });
        } catch (error) {
          console.error(error.message);
        }
      },

      // ESTO ES PARA LLEVAR UN REGISTRO DE COMO SE TRABAJABA DESDE LOCAL
      // addContact: (newContact) => {
      //   const store = getStore();
      //   const updatedContacts = [
      //     ...store.contacts,
      //     { ...newContact, id: uuidv4() },
      //   ];
      //   setStore({ contacts: updatedContacts });
      // },


      addContact: async (newContact) => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/rafael-nava/contacts`,
            {
              method: "POST",
              body: JSON.stringify(newContact),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `No se pudo agregar el contacto: ${response.statusText}`
            );
          }
          let data = await response.json();
          console.log(data);
          getActions().loadContacts(); // Recargar la lista de contactos después de agregar uno nuevo
        } catch (error) {
          console.error(error.message);
        }
      },

      // ESTO ES PARA LLEVAR UN REGISTRO DE COMO SE TRABAJABA DESDE LOCAL      
      // editContact: (id, updatedContact) => {
      //   const store = getStore();
      //   const updatedContacts = store.contacts.map((contact) => {
      //     if (contact.id === id) {
      //       return { ...contact, ...updatedContact };
      //     }
      //     return contact;
      //   });
      //   setStore({ contacts: updatedContacts });
      // },

      editContact: async (id, updatedContact) => {
        try {
          let response = await fetch(
            `https://playground.4geeks.com/contact/agendas/rafael-nava/contacts/${id}`,
            {
              method: "PUT",
              body: JSON.stringify(updatedContact),
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `No se pudo actualizar el contacto: ${response.statusText}`
            );
          }
          let data = await response.json();
          console.log(data);
          getActions().loadContacts(); // Recargar la lista de contactos después de actualizar uno existente
        } catch (error) {
          console.error(error.message);
        }
      },

      // ESTO ES PARA LLEVAR UN REGISTRO DE COMO SE TRABAJABA DESDE LOCAL      
      //   deleteContact: (id) => {
      //     const store = getStore();
      //     const updatedContacts = store.contacts.filter((contact) => contact.id !== id);
      //     setStore({ contacts: updatedContacts });
      //   },

      deleteContact: async (id) => {
        try {
          const response = await fetch(
            `https://playground.4geeks.com/contact/agendas/rafael-nava/contacts/${id}`,
            {
              method: "DELETE",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response.ok) {
            throw new Error(
              `No se pudieron recuperar los datos: ${response.statusText}`
            );
          }
          let data = await response.json();
          console.log(data);
            //NO ME FUNCIONA DE ESTA MANERA POR ESO AGREGO LA RECARGA DE VENTANA EN LA FUNCION confirmDelete DE DEMO
          // Actualizar el estado local solo si la eliminación de la API fue exitosa
          // const updatedContacts = store.contacts.filter(contact => contact.id !== id);
           // actions.setContacts(updatedContacts);

            // Recargar la lista de contactos después de eliminar uno existente
            // actions.loadContacts();
        } catch (error) {
          console.error(error.message);
        }
      },
    },
  };
};

export default getState;
