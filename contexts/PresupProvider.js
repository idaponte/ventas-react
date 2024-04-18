import { createContext, useState } from 'react'
import { presupMockup } from '../utils/presupMockup'

export const PresupContext = createContext({
    presupuesto: {},
    setPresupuesto: () => { },

    loadPresupuesto: () => { },
    savePresupuesto: () => { },
    resetPresupuesto: () => { },
    setCustomerData: () => { }
})

const PresupProvider = ({ children }) => {

    const [presupuesto, setPresupuesto] = useState({
        ...presupMockup
    })



    const loadPresupuesto = () => {
    }

    const savePresupuesto = () => {
    }

    const resetPresupuesto = () => {
        setPresupuesto({ ...presupMockup })
    }

    const setCustomerData = (key, value) => {
        setPresupuesto({
            ...presupuesto,
            customer: {
                ...presupuesto.customer,
                [key]: value
            }
        })
    }

    return (
        <PresupContext.Provider value={{
            presupuesto,
            setPresupuesto,

            loadPresupuesto,
            savePresupuesto,
            resetPresupuesto,
            setCustomerData
        }}>
            {children}
        </PresupContext.Provider>
    )
}

export default PresupProvider