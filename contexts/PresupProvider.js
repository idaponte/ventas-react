import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { presupMockup } from '../utils/presupMockup'
import { DataContext } from './DataProvider'
import { formatPrice } from '../utils/currencyFormatter'
import { showToast } from '../utils/showToast'

export const PresupContext = createContext({
    presupuesto: {},
    esAbonoInalambrico: false,
    setPresupuesto: () => { },

    loadPresupuesto: () => { },
    savePresupuesto: () => { },
    resetPresupuesto: () => { },
    setCustomerData: () => { },
    addItem: () => { },
    resetItems: () => { },
    addComunicador: () => { },
    hasPresupComunicador: () => { },
    resetPrecioComunicador: () => { },
    handleDeleteItem: () => { }
})

const PresupProvider = ({ children }) => {
    const { preciosById, tipoInstalacion, tipoPago, bonifs, meses, tipoAbono, precioMateriales, getTipoAbonoById, esItemComunicador } = useContext(DataContext)

    const dataInicializada = useRef(false)

    const [presupuesto, setPresupuesto] = useState({
        ...presupMockup
    })

    const [esAbonoInalambrico, setEsAbonoInalambrico] = useState(false)

    useEffect(() => {
        const abono = getTipoAbonoById(presupuesto.oper.insta_id)
        const result = abono?.label.toLowerCase().includes('inalambrico')
        setEsAbonoInalambrico(result)
    }, [presupuesto.oper.insta_id])


    useEffect(() => {
        console.log('esAbonoInalambrico', esAbonoInalambrico)

    }, [esAbonoInalambrico])

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
            precio: data['precio'] ?? '',
            name: data['name'],
            insta_precio: data['insta_precio'] ?? 0,
            observ: '',
            user_id: data['user_id'],
            qty: data['qty'] ?? 1,
            sqty: data['sqty'] ?? 1,
            faltante: 0,
            qty_cajon: 0,
        }
    }

    const addComunicador = (com) => {
        console.log('addComunicador')
        const item = createItem({ ...com, qty: 0, sqty: 0 })
        setPresupuesto({
            ...presupuesto,
            items: [...presupuesto.items, item]
        })
    }


    const addItem = (item) => {
        const isComunicador = esItemComunicador(item.generic_id)
        console.log('esAbonoInalambrico', esAbonoInalambrico)
        if (isComunicador && !esAbonoInalambrico) {
            showToast('Seleccione un abono inalámbrico antes de agregar un comunicador')
            return
        }

        const itemExists = presupuesto.items.find(i => i.generic_id === item.generic_id)

        if (itemExists) {
            showToast('El item ya existe en el presupuesto')
            return
        }

        const newItem = createItem(item)



        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: [...oldPresup.items, newItem]
        }))
    }

    const resetItems = () => {
        console.log('resetItems')
        setPresupuesto({
            ...presupuesto,
            items: []
        })
    }


    useEffect(() => {
        const comunicador = preciosById[24]
        if (!comunicador) return
        addComunicador(comunicador)
    }, [preciosById])

    useEffect(() => {
        if (bonifs.length === 0) return
        if (meses.length === 0) return
        if (tipoPago.length === 0) return
        if (dataInicializada.current) return

        const instaIdResidencial = tipoAbono.find(tipo => tipo.label.trim().toLowerCase() === 'residencial')?.value || 0

        console.log('Seteando insta id residencial')

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            oper: {
                ...oldPresup.oper,
                categoria: tipoInstalacion[0].value,
                tipoPago: tipoPago[0].value,
                insta_id: instaIdResidencial
            },
            abono: {
                ...oldPresup.abono,
                bonifAbono: bonifs[0].value,
                bonifMeses: meses[0].value
            }
        }))

        dataInicializada.current = true
    }, [tipoPago, meses, bonifs])

    useEffect(() => {
        console.log('rendering')
    }, [])

    const totalPrecioMateriales = formatPrice(presupuesto.items.reduce((acc, item) => {
        return acc + (item.qty * precioMateriales)
    }, 0))

    const totalEquipos = formatPrice(presupuesto.items.reduce((acc, item) => {
        const value = item.qty * (Number(item.precio) + precioMateriales)
        return acc + value

    }, 0))

    const totalInsta = formatPrice(presupuesto.items.reduce((acc, item) => {
        const value = item.qty * Number(item.insta_precio)
        return acc + value
    }, 0))

    const hasPresupComunicador = () => {
        return presupuesto.items.find(item => esItemComunicador(item.generic_id))
    }

    const resetPrecioComunicador = (value = 0) => {
        const comunicador = presupuesto.items.find(item => item.generic_id === 24)
        if (!comunicador) return

        const newItems = presupuesto.items.map(item => {
            if (item.generic_id === comunicador.generic_id) {
                return {
                    ...item,
                    precio: value
                }
            }
            return item
        })

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: newItems
        }))
    }

    const procesarBorrado = (id) => {
        const newItems = presupuesto.items.filter(i => i.generic_id !== id)

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: newItems
        }))
    }

    const restaAlgunComunicador = (id) => {
        const comunicadores = presupuesto.items.filter(i => esItemComunicador(i.generic_id) && i.generic_id !== id && i.qty > 0)
        return comunicadores.length >= 1
    }

    const tryRomveComunicador = (id) => {
        const quedaComunicador = restaAlgunComunicador(id)

        if (quedaComunicador) {
            console.log('Queda al menos un comunicador en el presupuesto')
            procesarBorrado(id);
            return true
        } else {
            console.log('Debe dejar al menos un comunicador en el presupuesto')
            showToast('Debe dejar al menos un comunicador en el presupuesto')
            return false
        }

    }

    const handleDeleteItem = (id) => {
        console.log('handleDeleteItem', id)
        const esComunicador = esItemComunicador(id)

        if (esComunicador) {
            const commDeleted = tryRomveComunicador(id)
            return commDeleted
        }

        procesarBorrado(id)
        return true
    }

    return (
        <PresupContext.Provider value={{
            presupuesto,
            totalPrecioMateriales,
            totalEquipos,
            totalInsta,
            esAbonoInalambrico,

            setPresupuesto,
            loadPresupuesto,
            savePresupuesto,
            resetPresupuesto,
            setCustomerData,
            addItem,
            resetItems,
            addComunicador,
            hasPresupComunicador,
            resetPrecioComunicador,
            handleDeleteItem
        }}>
            {children}
        </PresupContext.Provider>
    )
}

export default PresupProvider