import { createContext } from "react"

const AgendaContext = createContext({})

const AgendaService = ({ children }) => {
    return (
        <AgendaContext.Provider value={{}}>
            {children}
        </AgendaContext.Provider>
    )
}

export default AgendaService