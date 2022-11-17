import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useAuthContext } from '../hooks/useAuthContext'

export default function Pledge() {

  const { user } = useAuthContext()
    const [form, setForm] = useState({
        goal: "",
        goalAmount: 0,
        currentAmount: 0,
        visibility: "",
        goalDate: "",
        contributors: []
      });

    const [pledgeAmount, setPledgeAmount] = useState(0)
     
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
 

   async function fetchData() {
    
     const id = params.id.toString();
     const response = await fetch(`http://localhost:4000/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const goals = await response.json();
     if (!goals) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(goals);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   //updateForm
   const editedGoal = {
     goal: form.goal,
     goalAmount: form.goalAmount,
     currentAmount: (form.currentAmount+pledgeAmount),
     visibility: form.visibility,
     contributors: user.user.username
   };
  console.log(editedGoal)
  //  console.log(user.user.username)
   setPledgeAmount(0)
   // This will send a patch request to update the data in the database.
   await fetch(`http://localhost:4000/edit/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedGoal),
     headers: {
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${user.token}`
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Pledge Funds</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="goal">Goal: </label>
         <input
           type="text"
           className="form-control"
           id="goal"
           readOnly={true}
           disabled={true}
           value={form.goal}
           //onChange={(e) => updateForm({ goal: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="goalAmount">Goal Amount: </label>
         <input
           type="text"
           className="form-control"
           id="goalAmount"
           readOnly={true}
           disabled={true}
           value={form.goalAmount}
           //onChange={(e) => updateForm({ goalAmount: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="currentAmount">Current Amount</label>
         <input
           type="text"
           readOnly={true}
           disabled={true}
           className="form-control"
           id="currentAmount"
           value={form.currentAmount}
          
         />
       </div>
       <div className="form-group">
         <label htmlFor="pledgeAmount">YOUR PLEDGE AMOUNT: </label>
         <input
           type="text"
           className="form-control"
           id="pledgeAmount"
           value={null}
           onChange={(e) => setPledgeAmount(Number(e.target.value))}

          // onChange={(e) => updateForm({ currentAmount: Number(e.target.value) + Number(form.currentAmount) })}
         />
       </div>
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Goal"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}