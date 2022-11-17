import { useState } from 'react'

import { useAuthContext } from './useAuthContext'


export const useRegister = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()


    const register = async (email, username, password) => {
        setIsLoading(true)
        setError(null)


        const response = await fetch('http://localhost:4000/user/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
            'Accept': 'application/json'},
            body: JSON.stringify({email, username, password})
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }

        if (response.ok) {
            // Save the user to local storage with JWT
            localStorage.setItem('user', JSON.stringify(json.token))
            
            // Update auth context
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
        }
        
    } 

    return { register, isLoading, error }
}