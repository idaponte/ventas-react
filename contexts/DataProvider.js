import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getData as fetchData } from "../services/getData";
import { quitarTildes } from "../utils/quitarTildes";
import LoadingScreen from "../screens/LoadingScreen";
import { AuthContext } from "./AuthProvider";
import AsyncStorage from '@react-native-async-storage/async-storage';



export const DataContext = createContext({
    bonifs: [],
    meses: [],
    tipoinstalaciones: [],
    tipoAbono: [],
    rubros: [],
    dolar: [],
    precios: [],
    preciosById: {},
    tipoInstalacion: [],
    tipoPago: [],
    precioMateriales: 0,
    searchPrecios: () => { },
    getRubroById: () => { },
    getPrecioById: () => { },
    getPreciosById: () => { },
    getTipoAbonoById: () => { },
    esItemComunicador: () => { },
    getRemoteData: () => { },
    esAbonoInalambrico: () => { }
});

export const DataProvider = ({ children }) => {
    const { prevLogged, loading } = useContext(AuthContext)

    const [data, setData] = useState({
        bonifs: [],
        meses: [],
        tipoinstalaciones: [],
        tipoAbono: [],
        rubros: [],
        dolar: [],
        precios: [],
        precioMateriales: 0,
    })

    const [preciosById, setPreciosById] = useState({})
    const [rubrosById, setRubrosById] = useState({})

    const storeData = async (toStoreData) => {
        const dataDraft = { ...toStoreData }

        Object.keys(dataDraft).forEach(async key => {
            await AsyncStorage.setItem(key, JSON.stringify(dataDraft[key]))
        })

        console.log('Data stored')
    }

    const getLocalData = async () => {
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
        loadMaps(dataDraft)
    }

    const loadMaps = (dataDraft) => {
        const preciosByIdDraft = dataDraft.precios.reduce((acc, precio) => {
            return {
                ...acc,
                [precio.generic_id]: precio
            }
        }, {})

        const rubrosByIdDraft = dataDraft.rubros.reduce((acc, rubro) => {
            return {
                ...acc,
                [rubro.rubro_id]: rubro
            }
        }, {})

        setPreciosById(preciosByIdDraft)
        setRubrosById(rubrosByIdDraft)
    }

    const getRemoteData = async () => {
        const newData = await fetchData()
        const dataDraft = {}

        for (const key in newData) {
            dataDraft[key] = newData[key]
        }

        dataDraft.bonifs = dataDraft.bonifs.filter(bonif => bonif.discount === '0.15').map(bonif => ({ label: bonif.name, value: bonif.discount }))
        dataDraft.meses = dataDraft.meses.map(mes => ({ label: `${mes.cant} meses`, value: mes.cant }))
        dataDraft.tipoAbono = dataDraft.tipoinstalaciones.map(tipo => ({ label: quitarTildes(tipo.name), value: tipo.insta_id, precio: tipo.abono }))



        setData({ ...dataDraft })
        loadMaps(dataDraft)

        storeData({ ...dataDraft })
    }

    const getData = () => {
        if (prevLogged) {
            console.log('getting local data')
            getLocalData()
        } else {
            console.log('getting remote data')
            getRemoteData()
        }
    }

    useEffect(() => {
        getData()
    }, [loading, prevLogged])


    const searchPrecios = (text) => {
        if (!text) return []
        return data.precios.filter(precio => precio.name.toLowerCase().includes(text.toLowerCase()))
    }

    const getRubroById = (id) => rubrosById[id]

    const getPrecioById = (id) => preciosById[id]

    const getPreciosById = (arr) => arr.map(id => preciosById[id]).filter(precio => precio !== undefined)

    const getTipoAbonoById = (id) => data.tipoAbono.find(tipo => tipo.value === id)

    const esAbonoInalambrico = (id) => {
        const tipo = data.tipoAbono.find(tipo => tipo.value === id)
        return tipo.label.toLowerCase().includes('inalam')
    }

    const esItemComunicador = (generic_id) => getPrecioById(generic_id)?.name.toLowerCase().includes('comunicador')

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

    useEffect(() => {
        const precioMateriales = Number(preciosById[325]?.precio) || 0
        if (!precioMateriales) return

        setData(oldData => {
            console.log('setting data - precioMateriales')

            return {
                ...oldData,
                precioMateriales
            }
        })

    }, [preciosById])

    if (
        !data.bonifs.length ||
        !data.meses.length ||
        !data.tipoinstalaciones.length ||
        !data.tipoAbono.length ||
        !data.rubros.length ||
        !Object.keys(data.dolar).length ||
        !data.precios.length ||
        !data.precioMateriales
    ) {
        return <LoadingScreen />
    }

    return (
        <DataContext.Provider value={{
            ...data,
            preciosById,
            tipoInstalacion,
            tipoPago,
            searchPrecios,
            getRubroById,
            getPrecioById,
            getPreciosById,
            getTipoAbonoById,
            esItemComunicador,
            getRemoteData,
            esAbonoInalambrico
        }}>
            {children}
        </DataContext.Provider>
    )
}
