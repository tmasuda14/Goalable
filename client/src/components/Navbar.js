import React from "react";
import { useAuthContext } from "../hooks/useAuthContext";

// Import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

import { useLogout } from '../hooks/useLogout'

import target_image from '../images/target.png'
 
// Display the Navbar
export default function Navbar() {
  const { user } = useAuthContext()
  const { logout } = useLogout()

  const handleClick = () => {
    logout()
  }
 return (
   <div>
     <nav className="navbar navbar-expand-lg navbar-light bg-light">
       <NavLink className="navbar-brand" to="/">
        GOALABLE
       </NavLink>
       <button
         className="navbar-toggler"
         type="button"
         data-toggle="collapse"
         data-target="#navbarSupportedContent"
         aria-controls="navbarSupportedContent"
         aria-expanded="false"
         aria-label="Toggle navigation"
       >
         <span className="navbar-toggler-icon"></span>
       </button>
       <div className="collapse navbar-collapse" id="navbarSupportedContent">
         <ul className="navbar-nav ml-auto">
           {!user && (
           <li className="nav-item">
             <NavLink className="nav-link" to="/login">
               Login
             </NavLink>
           </li>
           )}
           {user && (
            
            <div>
              <li className="nav-item">
             <NavLink className="nav-link" to="/">
               Browse
             </NavLink>
           </li>
            <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/create">
              Create Record
            </NavLink>
          </li>
           <li className="nav-item">
            <span></span>
            <NavLink className="nav-link" onClick={handleClick} to="/">
               Log out ({user.user.username})
             </NavLink>
           </li>
           </div>
           )}
         </ul>
       </div>
       <img alt="An arrow bullseye" src={target_image} width="300px" height="160px" />  
     </nav>
   </div>
 );
}
