import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from '../hooks/useAuthContext'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

import bank_image from '../images/bank.png'
import baby_image from '../images/baby-boy.png'
import confetti_image from '../images/confetti.png'
import family_image from '../images/family.png'
import grad_image from '../images/graduation-cap.png'
import paw_image from '../images/paw.png'
import savings_image from '../images/savings.png'
import wedding_image from '../images/wedding-rings.png'


export default function Create() {
  const [dateValue, setDateValue] = useState(new Date());
  const { user } = useAuthContext()
 const [form, setForm] = useState({
   goal: "",
   goalAmount: 0,
   currentAmount: 0,
   visibility: "",
   goalDate: {}, // CHANGE
   goalImage: "",
   user_id: ""
 });

 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
    console.log(value)
    console.log(value.goalImage)
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 const onSubmit = async (e) => {
   e.preventDefault();
  if(!user) {
    return
  }
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newGoal = { ...form };
   newGoal.user_id = user._id
   newGoal.goalDate = dateValue
   console.log(newGoal)
   console.log(newGoal.goalImage)
   const response = await fetch('http://localhost:4000', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
     },
     body: JSON.stringify(newGoal),
   })
  //  .catch(error => {
  //    window.alert(response.error);

  //    //return;
  //  });
  const json = await response.json()
  if(!response.ok){
    window.alert(json.error)
  }
   
   setForm({ goal: "", goalAmount: 0, currentAmount: 0, visibility: "", goalDate: {}, user_id: "", goalImage: "" });
   if(response.ok) {
    navigate("/home");
   }
   
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Record</h3>
     <h5>  Target Date:</h5>
     <Calendar
                onChange={setDateValue}
                value={dateValue}
            />  
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="goal">Goal</label>
         <input
           type="text"
           className="form-control"
           id="goal"
           value={form.goal}
           onChange={(e) => updateForm({ goal: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="goalAmount">Goal Amount</label>
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
           value={0}
           onChange={(e) => updateForm({ currentAmount: e.target.value })}
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
         <div className="form-group image-group">
         {/* <label htmlFor="imageselect">Select Image</label>
         <input
           type="image"
           className="form-control"
           id="imageselect"s
           value={}
           onChange={(e) => updateForm({ goalImage: e.target.value })}



            <input type="radio" name="imagechoice" className="sr-only" id="baby" onClick={(e) => updateForm({ goalImage: "baby_image" })}/>
  <label for="male">
    <img src={baby_image}  alt="baby"/>
  </label>


  import bank_image from '../images/bank.png'
import baby_image from '../images/baby-boy.png'
import confetti_image from '../images/confetti.png'
import family_image from '../images/family.png'
import grad_image from '../images/graduation-cap.png'
import paw_image from '../images/paw.png'
import savings_image from '../images/savings.png'
import wedding_image from '../images/wedding-rings.png'
         /> */}
         <h4>CREATE GOAL:</h4>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Bank" 
                   src={bank_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) => {e.preventDefault();  updateForm({ goalImage: "bank" })}}
            />
          </div>


          
          <div className="form-check-inline">
            <input type="image" 
                   alt="Savings" 
                   src={savings_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) => {e.preventDefault(); updateForm({ goalImage: "savings" })}}
            />
          </div>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Party" 
                   src={confetti_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) =>  {e.preventDefault(); updateForm({ goalImage: "confetti" })}}
            />
          </div>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Pet" src={paw_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) => {e.preventDefault(); updateForm({ goalImage: "animal" })}}
            />
          </div>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Grad" 
                   src={grad_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) =>{e.preventDefault(); updateForm({ goalImage: "graduation" })}}
            />
          </div>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Wedding" 
                   src={wedding_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) => {e.preventDefault(); updateForm({ goalImage: "wedding" })}}
            />
          </div>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Family" 
                   src={family_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) => {e.preventDefault(); updateForm({ goalImage: "family" })}}
            />
          </div>
          <div className="form-check-inline">
            <input type="image" 
                   alt="Baby" 
                   src={baby_image} 
                   width="50px" 
                   height="50px" 
                   onClick={(e) => {e.preventDefault(); updateForm({ goalImage: "baby" })}}
            />
          </div>
       </div>
     
       <div className="form-group">
         <input
           type="submit"
           value="Create Goal"
           className="btn btn-primary"
         />
       </div>
     </form>




  


  <br></br><br></br> <br></br><br></br> <br></br><br></br>
     <footer> <a href="https://www.flaticon.com/free-icons/family" title="family icons">Family icons created by Freepik - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/baby" title="baby icons">Baby icons created by Freepik - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/party" title="party icons">Party icons created by tulpahn - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/paw" title="paw icons">Paw icons created by Freepik - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/mortarboard" title="mortarboard icons">Mortarboard icons created by Good Ware - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/diamond" title="diamond icons">Diamond icons created by Freepik - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/bank" title="bank icons">Bank icons created by Freepik - Flaticon</a>
     <a href="https://www.flaticon.com/free-icons/savings" title="savings icons">Savings icons created by Freepik - Flaticon</a></footer>
   </div>
 );
}