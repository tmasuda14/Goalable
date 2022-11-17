import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";
// import goal_image from '../images/goal_image.png'

import bank_image from '../images/bank.png'
import baby_image from '../images/baby-boy.png'
import confetti_image from '../images/confetti.png'
import family_image from '../images/family.png'
import grad_image from '../images/graduation-cap.png'
import paw_image from '../images/paw.png'
import savings_image from '../images/savings.png'
import wedding_image from '../images/wedding-rings.png'

let imagelst = {
  "bank": bank_image,
  "baby": baby_image,
  "confetti": confetti_image,
  "family": family_image,
  "graduation": grad_image,
  "animal": paw_image,
  "savings": savings_image,
  "wedding": wedding_image
}

 
const Goal = (props) => (
 <tr>
   <td><img alt="A goal" src={imagelst[`${props.goal.goalImage}`]} width="50px" height="50px"/></td>
   <td>{props.goal.goal}</td>
   <td>{props.goal.goalAmount}</td>
   <td>{props.goal.currentAmount}</td> 
   {props.user && 
   <td>
     <Link className="btn btn-link" to={`/${props.goal._id}`}>Pledge</Link> 
   </td>}
   <td>TEXTQR</td>
 </tr>
);
 
export default function GoalList() {
  const { user } = useAuthContext()
  //console.log(user)
 const [goals, setGoals] = useState([]);
 
 // This method fetches the Goals from the database.
 useEffect(() => {
   async function getGoals() {
     const response = await fetch('http://localhost:4000/');
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const newGoals = await response.json();
     //console.log(newGoals)
     setGoals(newGoals);
   }
 
   getGoals();
 
   return;
 }, [goals.length]);

 // This method will map out the goals on the table
 function goalList() {
   return goals.map((goal) => {
    console.log(goal)
     return (
       <Goal
         goal={goal}
         key={goal._id}
         user={user}
       />
      
     );
   });
 }
 
 // This following section will display the table with the goals of individuals.
 return (
    
   <div>
    <div>
        <h2>Welcome to Goalable</h2>
    </div>

      <h3>Browse</h3>
     

     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
          <th></th>
           <th>Public Goals</th>
           <th>Goal Amount</th>
           <th>Current Amount</th>
           {user && <th>Support a goal!</th>}
           <th>Share</th>
         </tr>
       </thead>
       <tbody>{goalList()}</tbody>
     </table>
      

   </div>
 );
}