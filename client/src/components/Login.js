import React from "react"
import { NavLink } from "react-router-dom";

// Login form with a link to the register page.
export default function Login() {
return (
  <div className="text-center"> 
    <main className="form-signin w-100 m-auto">
      <form>
        <img className="mb-4" src="/docs/5.2/assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"></img>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating">
          <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me"/> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="Submit">Sign in</button>
        <li className="nav-item w-100 btn btn-lg btn-secondary" type="Register">
          <NavLink className="nav-link" to="/register">
            Register
          </NavLink>
        </li>
      </form>
    </main>
  </div>

);
}