import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'

// This function is used to access the context from any component.
export const useAuthContext = () => {

    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')

    }

    return context
} 