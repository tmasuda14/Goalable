import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
 
// Displays personal goals on a user's home page. Allows for editing and deleting of goals.
const Record = (props) => (
 <tr>
   <td>{props.record.goal}</td>
   <td  className="text-center">{props.record.goalAmount}</td>
   <td className="text-center">{props.record.currentAmount}</td>
   <td className="text-center">{props.record.visibility}</td>
   <td className="text-center">
     <Link className="btn btn-link link-secondary custom-link" to={`/edit/${props.record._id}`}>Edit</Link> |
     <button className="btn btn-link link-danger custom-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     > Delete </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 const { user } = useAuthContext()
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:4000/home`, {
      headers: {'Authorization': `Bearer ${user.token}`}
     });
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
  if(user) {
    getRecords();
  }
  
   
   return;
 }, [records.length, user]);
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:4000/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Record List</h3>
     <table className="table table-striped table-hover" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>Goal</th>
           <th className="text-center">Goal Amount</th>
           <th className="text-center">Current Amount</th>
           <th className="text-center">Visibility</th>
           <th className="text-center">Action</th>
         </tr>
       </thead>
       <tbody >{recordList()}</tbody>
     </table>
   </div>
 );
}