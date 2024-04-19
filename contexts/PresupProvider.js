import { createContext, useEffect, useState } from 'react'
import { presupMockup } from '../utils/presupMockup'

export const PresupContext = createContext({
    presupuesto: {},
    setPresupuesto: () => { },

    loadPresupuesto: () => { },
    savePresupuesto: () => { },
    resetPresupuesto: () => { },
    setCustomerData: () => { },
    addItem: () => { },
    resetItems: () => { },
    addComunicador: () => { }
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

    const createItem = (data) => {
        return {
            generic_id: data['generic_id'],
            precio: data['precio'] || '',
            name: data['name'],
            observ: '',
            user_id: data['user_id'],
            qty: data['qty'] || 1,
            sqty: data['sqty'] || 1,
            faltante: 0,
            qty_cajon: 0,
        }
    }

    const addComunicador = (com) => {
        const item = createItem({ ...com, qty: 0, sqty: 0 })
        setPresupuesto({
            ...presupuesto,
            items: [...presupuesto.items, item]
        })
    }


    const addItem = (item) => {
        const newItem = createItem(item)

        setPresupuesto({
            ...presupuesto,
            items: [...presupuesto.items, newItem]
        })
    }

    const resetItems = () => {
        setPresupuesto({
            ...presupuesto,
            items: []
        })
    }

    return (
        <PresupContext.Provider value={{
            presupuesto,


            setPresupuesto,
            loadPresupuesto,
            savePresupuesto,
            resetPresupuesto,
            setCustomerData,
            addItem,
            resetItems,
            addComunicador
        }}>
            {children}
        </PresupContext.Provider>
    )
}

export default PresupProvider