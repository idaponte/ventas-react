import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getData as fetchData } from "../services/getData";
import { quitarTildes } from "../utils/quitarTildes";
import LoadingScreen from "../screens/LoadingScreen";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const DataContext = createContext({
    bonifs: [],
    dolarCotiz: 0,
    items: {},
    meses: [],
    precioMateriales: 0,
    rubros: [],
    tipoAbono: {},
    tipoInstalacion: [],
    tipoPago: [],

    esAbonoInalambrico: () => { },
    esItemComunicador: () => { },
    getItemById: () => { },
    getItemsById: () => { },
    getRemoteData: () => { },
    getRubroById: () => { },
    getTipoAbonoById: () => { },
    searchItems: () => { },
    toPesos: () => { },
});

export const DataProvider = ({ children }) => {
    const { prevLogged, loading } = useContext(AuthContext)

    const [data, setData] = useState({
        bonifs: [],
        meses: [],
        tipoAbono: {},
        rubros: [],
        items: {},
        dolarCotiz: 0,
        precioMateriales: 0,
    })


    const storeData = async (dataDraft) => {
        try {
            Object.keys(dataDraft).forEach(async key => {
                await AsyncStorage.setItem(key, JSON.stringify(dataDraft[key]))
            })
        } catch (error) {
            console.error(error)
        }
    }

    const getLocalData = async () => {
        console.log('fetching local data')
        try {
            const dataDraft = { ...data }

            const localData = await Promise.all(Object.keys(dataDraft).map(async key => {
                const value = await AsyncStorage.getItem(key)
                const parsedValue = JSON.parse(value)
                return { [key]: parsedValue }
            }))

            localData.forEach(obj => {
                Object.assign(dataDraft, obj)
            })

            setData({ ...dataDraft })
        } catch (error) {
            console.error(error)
        }
    }



    const getRemoteData = async () => {
        console.log('fetching remote data')
        const dataDraft = await fetchData()


        dataDraft.bonifs = dataDraft.bonifs.filter(bonif => bonif.discount === '0.15').map(bonif => ({ label: bonif.name, value: bonif.discount }))
        dataDraft.meses = dataDraft.meses.map(mes => ({ label: `${mes.cant} meses`, value: mes.cant }))
        dataDraft.rubros = dataDraft.rubros.map(rubro => ({ label: quitarTildes(rubro.name).toLowerCase(), value: rubro.rubro_id }))
        dataDraft.dolarCotiz = Number(dataDraft.dolar.cotiz)


        const adaptedTipoAbono = {}
        dataDraft.tipoAbono.forEach(tipo => {
            adaptedTipoAbono[tipo.insta_id] = { label: quitarTildes(tipo.name).toLowerCase(), value: tipo.insta_id, precio: tipo.abono }
        })
        dataDraft.tipoAbono = adaptedTipoAbono

        const adaptedItems = {}
        dataDraft.items.forEach(precio => {
            const label = quitarTildes(precio.name).toLowerCase()

            let prasedPrecio = Number(precio.precio)
            if (isNaN(prasedPrecio)) prasedPrecio = 0

            let parsedInstaPrecio = Number(precio.insta_precio)
            if (isNaN(parsedInstaPrecio)) parsedInstaPrecio = 0

            adaptedItems[precio.generic_id] = {
                ...precio,
                label,
                value: precio.generic_id,
                precio: prasedPrecio,
                insta_precio: parsedInstaPrecio,
            }
        })
        dataDraft.items = adaptedItems

        const precioMateriales = dataDraft.items[325].precio
        dataDraft.precioMateriales = precioMateriales

        setData({ ...dataDraft })
        storeData({ ...dataDraft })
    }

    const getData = () => {
        if (prevLogged) {
            getLocalData()
        } else {
            getRemoteData()
        }
    }

    useEffect(() => {
        getData()
    }, [loading, prevLogged])


    const searchItems = (text) => {
        if (!text) return []
        const normalizedText = quitarTildes(text).toLowerCase()
        return Object.values(data.items).filter(item => {
            return item.label.includes(normalizedText)
        })
    }

    const getRubroById = (id) => data.rubros.find(({ value }) => value === id)

    const getItemById = (id) => data.items[id]

    const getItemsById = (ids) => ids.map(getItemById).filter(precio => precio !== undefined)

    const getTipoAbonoById = (id) => data.tipoAbono[id]

    const esAbonoInalambrico = (id) => {
        try {
            const tipo = getTipoAbonoById(id)
            if (!tipo) throw new Error('tipo abono not found')
            return tipo.label.includes('inalam')
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const esItemComunicador = (generic_id) => {
        try {
            const item = getItemById(generic_id)
            if (!item) throw new Error('item not found')
            return item.name.toLowerCase().includes('comunicador')
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const toPesos = (usd) => usd * data.dolarCotiz


    const tipoInstalacion = [
        { label: 'Insta. común', value: 'Insta. común' },
        { label: 'Reseteo', value: 'Reseteo' },
        { label: 'Traslado', value: 'Traslado' },
    ]
    const tipoPago = [
        { label: 'otra', value: 'otra' },
        { label: 'contado', value: 'contado' },
        { label: '3 cuotas', value: '3_cuotas' },
        { label: '6 cuotas', value: '6_cuotas' },
        { label: 'contado sin descuentos', value: 'contado_sin_descuentos' },
    ]

    if (
        !data.bonifs.length ||
        !data.meses.length ||
        !Object.keys(data.tipoAbono).length ||
        !data.rubros.length ||
        !Object.keys(data.items).length ||
        !data.precioMateriales
    ) {
        console.log('loadddddds')
        return <LoadingScreen />
    }

    return (
        <DataContext.Provider value={{
            ...data,
            tipoInstalacion,
            tipoPago,
            esAbonoInalambrico,
            esItemComunicador,
            getItemById,
            getItemsById,
            getRemoteData,
            getRubroById,
            getTipoAbonoById,
            searchItems,
            toPesos,
        }}>
            {children}
        </DataContext.Provider>
    )
}
