import { useAuthContext } from './useAuthContext'

// Removes user from local storage and dispatches a LOGOUT action

export const useLogout = () => {
    const { dispatch } = useAuthContext()
    const logout = () => {
        

        // Remove user from local storage
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}