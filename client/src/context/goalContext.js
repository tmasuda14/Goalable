import { createContext } from 'react'

export const GoalsContext = createContext()

export const GoalsContextProvider = ({ children }) => {
    <GoalsContext.Provider>
        { children }
    </GoalsContext.Provider>
}