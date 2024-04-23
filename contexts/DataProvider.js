import { createContext, useEffect, useRef, useState } from "react";
import { getData } from "../services/getData";
import { quitarTildes } from "../utils/quitarTildes";
import LoadingScreen from "../screens/LoadingScreen";

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
});

export const DataProvider = ({ children }) => {
    // const [bonifs, setBonifs] = useState([])
    // const [meses, setMeses] = useState([])
    // const [tipoinstalaciones, setTipoinstalaciones] = useState([])
    // const [tipoAbono, setTipoAbono] = useState([])
    // const [rubros, setRubros] = useState([])
    // const [dolar, setDolar] = useState([])
    // const [precios, setPrecios] = useState([])
    // const [precioMateriales, setPrecioMateriales] = useState(0)


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

    useEffect(() => {
        getData().then(response => {
            const dataDraft = {}

            for (const key in response) {
                dataDraft[key] = response[key]
            }

            dataDraft.bonifs = dataDraft.bonifs.filter(bonif => bonif.discount === '0.15').map(bonif => ({ label: bonif.name, value: bonif.discount }))
            dataDraft.meses = dataDraft.meses.map(mes => ({ label: `${mes.cant} meses`, value: mes.cant }))
            dataDraft.tipoAbono = dataDraft.tipoinstalaciones.map(tipo => ({ label: quitarTildes(tipo.name), value: tipo.insta_id, precio: tipo.abono }))

            console.log(dataDraft.dolar)

            setData(oldData => {
                return {
                    ...dataDraft
                }
            })


            setPreciosById(dataDraft.precios.reduce((acc, precio) => {
                return {
                    ...acc,
                    [precio.generic_id]: precio
                }
            }, {}))

            setRubrosById(dataDraft.rubros.reduce((acc, rubro) => {
                return {
                    ...acc,
                    [rubro.rubro_id]: rubro
                }
            }, {}))
        })
    }, [])


    const searchPrecios = (text) => {
        if (!text) return []
        return data.precios.filter(precio => precio.name.toLowerCase().includes(text.toLowerCase()))
    }

    const getRubroById = (id) => rubrosById[id]

    const getPrecioById = (id) => preciosById[id]

    const getPreciosById = (arr) => arr.map(id => preciosById[id]).filter(precio => precio !== undefined)

    const getTipoAbonoById = (id) => data.tipoAbono.find(tipo => tipo.value === id)

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
            esItemComunicador
        }}>
            {children}
        </DataContext.Provider>
    )
}
