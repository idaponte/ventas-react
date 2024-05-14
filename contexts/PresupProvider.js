import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { presupMockup } from '../utils/presupMockup'
import { DataContext } from './DataProvider'
import { showToast } from '../utils/showToast'
import { PresupuestoModel } from '../models/PresupModel'
import LoadingScreen from '../screens/LoadingScreen'
import { useNavigation, useRoute } from '@react-navigation/native'

export const PresupContext = createContext({
    presupuesto: {},
    totales: {},
    cuotas: {
        cantMeses: 0,
        valorCuotaAceptado: 0,
        valorCuotaSugerido: 0
    },
    abonoInalambrico: false,
    isPresupEditable: false,

    setPresupuesto: () => { },

    loadPresupuesto: () => { },
    savePresupuesto: () => { },
    resetPresupuesto: () => { },
    setCustomerData: () => { },
    tryAddItem: () => { },
    resetItems: () => { },
    addComunicador: () => { },
    hasPresupComunicador: () => { },
    resetPrecioComunicador: () => { },
    handleDeleteItem: () => { },
    createEmptyPresupuesto: () => { }
})

const PresupProvider = ({ children }) => {
    const dataCtx = useContext(DataContext)
    const {
        bonifs,
        items,
        meses,
        precioMateriales,
        tipoAbono,
        tipoInstalacion,
        tipoPago,
        esAbonoInalambrico,
        esItemComunicador,
        getItemById,
        toPesos,
    } = dataCtx

    const dataInicializada = useRef(false)

    const [presupuesto, setPresupuesto] = useState(new PresupuestoModel())

    const [abonoInalambrico, setAbonoInalambrico] = useState(false)

    const [loadingPresupuesto, setLoadingPresupuesto] = useState(false)

    const isPresupEditable = presupuesto.oper.status.toLowerCase() === 'creado'


    const navigation = useNavigation()
    const route = useRoute()

    useEffect(() => {
        setAbonoInalambrico(
            esAbonoInalambrico(presupuesto.oper.insta_id)
        )
    }, [presupuesto.oper.insta_id])

    const loadPresupuesto = (presupuestoSF) => {
        setLoadingPresupuesto(true)
        resetPresupuesto()

        console.log(presupuestoSF)

        const presupuestoF = new PresupuestoModel(presupuestoSF)

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            abono: presupuestoF.abono,
            customer: presupuestoF.customer,
            oper: presupuestoF.oper,
            const: presupuestoF.const
        }))

        Object.values(presupuestoF.items).forEach(item => {
            const itemInstaPrecio = getItemById(item.generic_id).insta_precio

            const newItem = createItem({
                ...item,
                insta_precio: itemInstaPrecio
            })
            addItem(newItem)
        })

        setLoadingPresupuesto(false)
    }

    const createEmptyPresupuesto = () => {
        const newPresup = new PresupuestoModel()

        const comunicador = getItemById(24)
        const comItem = createItem({ ...comunicador, qty: 0, sqty: 0 })
        newPresup.addItem(comItem)

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            abono: newPresup.abono,
            customer: newPresup.customer,
            oper: newPresup.oper,
            const: newPresup.const,
            items: newPresup.items
        }))

        getTotales()

        navigation.navigate('Formulario')
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
        // TODO: insta_precio y precio se deben tratar siempre como numeros, solo serán string cuando se crea o actualiza el presupuesto
        // TODO: recordar tambien que si se carga un presupuesto del listado, PresupModel debe hacer el parseo de los precios para que sean numeros

        const newItem = {
            generic_id: data['generic_id'],
            precio: data['precio'] ?? 0,
            name: data['name'],
            insta_precio: data['insta_precio'] ?? 0,
            observ: data['observ'] ?? '',
            user_id: data['user_id'],
            qty: data['qty'] ?? 1,
            sqty: data['sqty'] ?? 1,
            faltante: 0,
            qty_cajon: 0,
            faltante: data['faltante'] ?? 0
        }

        const hasName = data['name'] !== undefined
        if (!hasName) {
            newItem.name = getItemById(data['generic_id']).name
        }

        return newItem
    }

    const addComunicador = (com) => {
        const item = createItem({ ...com, qty: 0, sqty: 0 })
        addItem(item)
    }


    const addItem = (item) => {
        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: {
                ...oldPresup.items,
                [item.generic_id]: item
            }
        }))
    }


    const tryAddItem = (item) => {

        const itemExists = presupuesto.items[item.generic_id]

        if (itemExists) {
            // showToast('El item ya existe en el presupuesto')
            return false
        }

        const isComunicador = esItemComunicador(item.generic_id)
        if (isComunicador && !abonoInalambrico) {
            showToast('Seleccione un abono inalámbrico antes de agregar un comunicador')
            return false
        }
        const newItem = createItem(item)
        addItem(newItem)
        return true
    }

    const resetItems = () => {
        console.log('resetItems')
        setPresupuesto({
            ...presupuesto,
            items: {}
        })
    }

    useEffect(() => {
        const comunicador = getItemById(24)
        if (!comunicador) return
        addComunicador(comunicador)
    }, [items])

    useEffect(() => {
        if (bonifs.length === 0) return
        if (meses.length === 0) return
        if (tipoPago.length === 0) return
        if (dataInicializada.current) return

        const instaIdResidencial = Object.values(tipoAbono).find(tipo => tipo.label.trim().toLowerCase() === 'residencial')?.value || 0

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            oper: {
                ...oldPresup.oper,
                categoria: tipoInstalacion[0].value,
                tipo_pago: tipoPago[0].value,
                insta_id: instaIdResidencial
            },
            abono: {
                ...oldPresup.abono,
                bonif_abono: bonifs[0].value,
                bonif_meses: meses[0].value
            }
        }))

        dataInicializada.current = true
    }, [tipoPago, meses, bonifs])

    const [totales, setTotales] = useState({
        totalEquiposAceptado: 0,
        totalEquiposSugerido: 0,
        totalInstaAceptado: 0,
        totalInstaSugerido: 0,
        totalInstaBonifAceptado: 0,
        totalInstaBonifSugerido: 0,
        totalPresupuestoAceptado: 0,
        totalPresupuestoSugerido: 0,
        totalContadoAceptado: 0,
        totalContadoSugerido: 0,
        totalPrecioMaterialesAceptado: 0,
        totalPrecioMaterialesSugerido: 0,
        totalMaterialesAceptado: 0,
        totalMaterialesSugerido: 0
    })

    useEffect(() => {
        const newTotales = getTotales()
        setTotales(newTotales)
    }, [
        presupuesto.items,
        presupuesto.oper.tipo_pago,
        presupuesto.abono.bonifpPercAux
    ])

    useEffect(() => {
        // console.log('presupuesto.items changed')
    }, [presupuesto.items])

    const [cuotas, setCuotas] = useState({
        cantMeses: 0,
        valorCuotaAceptado: 0,
        valorCuotaSugerido: 0
    })

    useEffect(() => {

        let cantMeses = '';
        const totalPresupuestoAceptado = totales.totalPresupuestoAceptado
        const totalPresupuestoSugerido = totales.totalPresupuestoSugerido
        let valorCuotaAceptado = 0
        let valorCuotaSugerido = 0
        const tipoPago = presupuesto.oper.tipo_pago;


        if (tipoPago == '6_cuotas') {
            valorCuotaAceptado = (totalPresupuestoAceptado / 6) * 1.15;
            valorCuotaSugerido = (totalPresupuestoSugerido / 6) * 1.15;
            cantMeses = 6;
        }

        if (tipoPago == '3_cuotas') {
            valorCuotaAceptado = totalPresupuestoAceptado / 3;
            valorCuotaSugerido = totalPresupuestoSugerido / 3;
            cantMeses = 3;
        }

        setCuotas(prev => ({
            ...prev,
            cantMeses,
            valorCuotaAceptado,
            valorCuotaSugerido
        }))

    }, [totales])

    const getTotales = () => {
        let totalPrecioMaterialesAceptado = 0
        let totalPrecioMaterialesSugerido = 0

        let totalEquiposAceptado = 0
        let totalEquiposSugerido = 0

        let totalInstaAceptado = 0
        let totalInstaSugerido = 0

        let totalMaterialesAceptado = 0
        let totalMaterialesSugerido = 0

        for (const generic_id in presupuesto.items) {
            const item = presupuesto.items[generic_id]
            totalPrecioMaterialesAceptado += item.qty * precioMateriales
            totalPrecioMaterialesSugerido += item.sqty * precioMateriales

            totalEquiposAceptado += item.qty * (item.precio + precioMateriales)
            totalEquiposSugerido += item.sqty * (item.precio + precioMateriales)

            totalInstaAceptado += item.qty * item.insta_precio
            totalInstaSugerido += item.sqty * item.insta_precio

            totalMaterialesAceptado += item.qty * precioMateriales
            totalMaterialesSugerido += item.sqty * precioMateriales
        }

        const bonifp = Number(presupuesto.abono.bonifp);
        const bonifpPerc = 1 - (presupuesto.abono.bonifpPercAux / 100);

        let totalInstaBonifAceptado = (totalInstaAceptado - bonifp) * bonifpPerc;
        let totalInstaBonifSugerido = (totalInstaSugerido - bonifp) * bonifpPerc;

        const totalPresupuestoAceptado = toPesos(totalEquiposAceptado) + totalInstaBonifAceptado;
        const totalPresupuestoSugerido = toPesos(totalEquiposSugerido) + totalInstaBonifSugerido;
        const totalContadoAceptado = totalPresupuestoAceptado * 0.9;
        const totalContadoSugerido = totalPresupuestoSugerido * 0.9;

        return {
            totalEquiposAceptado,
            totalEquiposSugerido,
            totalInstaAceptado,
            totalInstaSugerido,
            totalInstaBonifAceptado,
            totalInstaBonifSugerido,
            totalPresupuestoAceptado,
            totalPresupuestoSugerido,
            totalContadoAceptado,
            totalContadoSugerido,
            totalPrecioMaterialesAceptado,
            totalPrecioMaterialesSugerido,
            totalMaterialesAceptado,
            totalMaterialesSugerido
        }
    }


    const hasPresupComunicador = () => {
        return Object.keys(presupuesto.items).find(esItemComunicador) !== undefined
    }

    const resetPrecioComunicador = (value = 0) => {
        const comunicador = presupuesto.items[24]
        if (!comunicador) return


        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: {
                ...oldPresup.items,
                [24]: {
                    ...comunicador,
                    precio: value
                }
            }
        }))
    }

    const procesarBorrado = (id) => {
        const newItems = { ...presupuesto.items }
        delete newItems[id]

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: newItems
        }))
    }

    const restaAlgunComunicador = (id) => {
        const comunicadores = Object.values(presupuesto.items).filter(i => esItemComunicador(i.generic_id) && i.generic_id !== id && i.qty > 0)
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

    const crearJSON = () => {
    }

    if (loadingPresupuesto) {
        return <LoadingScreen />
    }

    return (
        <PresupContext.Provider value={{
            presupuesto,
            totales,
            cuotas,
            abonoInalambrico,
            isPresupEditable,

            setPresupuesto,
            loadPresupuesto,
            savePresupuesto,
            resetPresupuesto,
            setCustomerData,
            tryAddItem,
            resetItems,
            addComunicador,
            hasPresupComunicador,
            resetPrecioComunicador,
            handleDeleteItem,
            createEmptyPresupuesto,
        }}>
            {children}
        </PresupContext.Provider>
    )
}

export default PresupProvider