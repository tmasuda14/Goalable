import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

// Display a login page and call the login function
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password)
        
    } 

    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disabled={isLoading}>Log in</button>

         
            <button className="nav-item w-100 btn btn-lg btn-secondary" type="Register">
             <NavLink className="nav-link" to="/register">
               Register
             </NavLink> 
           </button>

           {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Login;