import { useState } from 'react'
import { useRegister } from '../hooks/useRegister'


const Register = () => {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { register, isLoading, error } = useRegister()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await register(email, username, password)

      
    } 

    return (
        <form className="register" onSubmit={handleSubmit}>
            <h3>Register</h3>
            <label>Email:</label>
            <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <label>Username:</label>
            <input
                type="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
            />

            <label>Password:</label>
            <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            
            <button disabled={isLoading}>Register</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default Register;