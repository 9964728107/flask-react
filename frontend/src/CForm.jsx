import React, { useState } from 'react'

export default function CForm({existingContact={},updateCallback}) {

    // const [updating,setUpdating]=useState()
    const updating = Object.entries(existingContact).length !== 0;
      const [firstName, setFirstName] = useState( existingContact["firstName"] || "" );
      const [lastName, setlastName] = useState(existingContact["lastName"] || "");
      const [email, setemail] = useState(existingContact["email"] || "");
      const [phoneNo, setphoneNo] = useState(existingContact["phoneNo"] || "");

      // setUpdating(Object.entries(existingContact).length!==0)


    const onSubmit= async(e)=>{
     e.preventDefault()
     const data={
        firstName,
        lastName,
        email,
        phoneNo
     }
     const url = "http://127.0.0.1:5000/" + (updating ? `update/${existingContact.id}`: 'create')
     const options={
        method:(updating ? "PATCH" : "POST"),
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
     }

     const reponse= await fetch(url,options)
     if(reponse.status !==201 && reponse.status!==200){
        const data = await reponse.json()
        alert(data.message)
     }
     else{
        updateCallback()
     }
   


    }
  
  return (
    <form action="http://127.0.0.1:5000/create" onSubmit={onSubmit}>
      <div className="formDiv">
        <div className="each">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            placeholder="fname"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="each">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            value={lastName}
            id="lastName"
            name="lastName"
            placeholder="lname"
            onChange={(e) => {
              setlastName(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="each">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            placeholder="gmail"
            onChange={(e) => {
              setemail(e.target.value);
            }}
          />
        </div>
        <br />
        <div className="each">
          <label htmlFor="phoneNo"> Phone</label>
          <input
            type="number"
            value={phoneNo}
            id="phoneNo"
            name="phoneNo"
            placeholder="phoneNo"
            onChange={(e) => {
              setphoneNo(e.target.value);
            }}
          />
        </div>
        <br />
        <button type="submit">{updating ? "Update" : "Create" }</button>
      </div>
    </form>
  );
}
