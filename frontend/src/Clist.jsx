import React from 'react'

export default function Clist({fetchData,contacts,updateContact,updateCallback}) {
// const updateContact=()=>{
    

// }
const deleteContact=async (id)=>{
  try{
      
     const val= confirm("want to delete?")
     console.log(val)
     if(val){
      const response = await fetch(`http://127.0.0.1:5000/delete/${id}`,{
        method:"POST",
      });
      console.log(response)
    }
    
    fetchData()
  }
  catch(e){
    console.log(e)

  }

}
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name: </th>
            <th>Second Name:</th>
            <th>gmail: </th>
            <th>phoneNo: </th>
            <th>Buttons</th>
          </tr>
        </thead>

        <tbody>
          {Object.entries(contacts).map(([key, contact]) => (
            <tr key={key}>
              <td>{contact.firstName}</td>
              <td>{contact.lastName}</td>
              <td>{contact.email}</td>
              <td>{contact.phoneNo}</td>

              <td>
                <button onClick={()=>updateContact(contact)}>Update</button>
                <button onClick={()=>deleteContact(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
