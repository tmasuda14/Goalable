import { createContext } from 'react'

export const GoalsContext = createContext()

// Provide the state to the components.
export const GoalsContextProvider = ({ children }) => {
    <GoalsContext.Provider>
        { children }
    </GoalsContext.Provider>
}