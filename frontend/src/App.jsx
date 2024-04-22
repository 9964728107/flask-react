import { useEffect, useState } from "react";

import "./App.css";
import Clist from "./Clist";
import CForm from "./CForm";

function App() {
  const [contacts, setContacts] = useState({});
  const [isModalOpen,setisModalOpen]=useState(false)
  const [currentContact,setcuurentConcat]=useState({})

  const fetchData = async () => {
    const response = await fetch("http://127.0.0.1:5000/contacts");
    const data = await response.json(); // Convert response to JSON
    setContacts(data); // Update state with fetched data
    console.log(contacts);
    for (const key in contacts) {
      const contact = contacts[key];
      console.log("Contact ID:", key);
      for (const field in contact) {
        console.log(field + ":", contact[field]);
      }
      console.log("---");
    }
  };
  const closeCreateModal =()=>{
    setisModalOpen(false)
    setcuurentConcat({})
  }
  const openCreateModal=()=>{
    if (!isModalOpen)setisModalOpen(true)

  }

  const openEditModal=(contact)=>{
   if(isModalOpen) return
   setcuurentConcat(contact)
   setisModalOpen(true)

  }

  const onUpdate=()=>{
    closeCreateModal()
    fetchData()
  }

  // useEffect(() => {
  //   fetchData();
  // }, []); // Empty dependency array to only run once on component mount

  return (
    <div className="container">
      <button onClick={fetchData}>Get Data</button>
      <div className="contacts-container">
        <Clist contacts={contacts} fetchData={fetchData}  updateContact={openEditModal} updateCallback={onUpdate} ></Clist>
        <button onClick={openCreateModal}>create</button>
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeCreateModal}>
                &times;
              </span>
              <CForm existingContact={currentContact} updateCallback={onUpdate}></CForm>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
