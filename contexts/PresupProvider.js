import { createContext, useContext, useEffect, useState } from 'react'
import { presupMockup } from '../utils/presupMockup'
import { DataContext } from './DataProvider'

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

    const { preciosById, tipoInstalacion, tipoPago, bonifs, meses, tipoAbono } = useContext(DataContext)

    useEffect(() => {
        const comunicador = preciosById[24]
        if (!comunicador) return
        addComunicador(comunicador)

        if (bonifs.length === 0) return
        if (meses.length === 0) return
        if (tipoPago.length === 0) return

        const instaIdResidencial = tipoAbono.find(tipo => tipo.label.trim().toLowerCase() === 'residencial')?.value || 0

        setPresupuesto({
            ...presupuesto,
            oper: {
                ...presupuesto.oper,
                categoria: tipoInstalacion[0].value,
                tipoPago: tipoPago[0].value,
                insta_id: instaIdResidencial
            },
            abono: {
                ...presupuesto.abono,
                bonifAbono: bonifs[0].value,
                bonifMeses: meses[0].value
            }
        })

    }, [tipoPago, meses, bonifs])

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