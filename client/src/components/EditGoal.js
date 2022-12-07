import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

// Allow a user to edit a goal.
export default function EditGoal() {
    const [form, setForm] = useState({
        goal: "",
        goalAmount: 0,
        currentAmount: 0,
        visibility: "",
        goalDate: new Date()
      });
     
    const params = useParams();
    const navigate = useNavigate();
    
    // On page load, fetch the goal data from the server.
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
   const editedGoal = {
     goal: form.goal,
     goalAmount: form.goalAmount,
     currentAmount: form.currentAmount,
     visibility: form.visibility,
   };
 
   // This will send a patch request to update the data in the database.
   await fetch(`http://localhost:4000/edit/${params.id}`, {
     method: "PATCH",
     body: JSON.stringify(editedGoal),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Goal</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="goal">Goal: </label>
         <input
           type="text"
           className="form-control"
           id="goal"
           value={form.goal}
           onChange={(e) => updateForm({ goal: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="goalAmount">Goal Amount: </label>
         <input
           type="text"
           className="form-control"
           id="goalAmount"
           value={form.goalAmount}
           onChange={(e) => updateForm({ goalAmount: e.target.value })}
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
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="visibilityOptions"
             id="privateOption"
             value="Private"
             checked={form.visibility === "Private"}
             onChange={(e) => updateForm({ visibility: e.target.value })}
           />
           <label htmlFor="privateOption" className="form-check-label">Private</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="visibilityOptions"
             id="friendsOption"
             value="Friends"
             checked={form.visibility === "Friends"}
             onChange={(e) => updateForm({ visibility: e.target.value })}
           />
           <label htmlFor="friendsOption" className="form-check-label">Friends</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="visibilityOptions"
             id="publicOption"
             value="Public"
             checked={form.visibility === "Public"}
             onChange={(e) => updateForm({ visibility: e.target.value })}
           />
           <label htmlFor="publicOption" className="form-check-label">Public</label>
         </div>
       </div>
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Goal"
           className="btn btn-primary"
         />
       </div>
       <div className="form-group">
         <label htmlFor="contributors">Contributors</label>
         <input
           type="text"
           readOnly={true}
           disabled={true}
           className="form-control"
           id="contributors"
           value={form.contributors}    
         />
         <button>Request Funds</button>
       </div>
     </form>
   </div>
 );
}