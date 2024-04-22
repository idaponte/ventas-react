import { createContext, useEffect, useState } from "react";
import { getData } from "../services/getData";

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
    searchPrecios: () => { },
    getRubroById: () => { },
    getPrecioById: () => { },
    getPreciosById: () => { }
});

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        bonifs: [],
        meses: [],
        tipoinstalaciones: [],
        tipoAbono: [],
        rubros: [],
        dolar: [],
        precios: [],
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
            dataDraft.tipoAbono = dataDraft.tipoinstalaciones.map(tipo => ({ label: tipo.name, value: tipo.insta_id, precio: tipo.abono }))


            setData(dataDraft)

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

    const getRubroById = (id) => {
        return rubrosById[id]
    }


    const getPrecioById = (id) => {
        console.log(preciosById[24])
        return preciosById[id]
    }

    const getPreciosById = (arr) => {
        return arr.map(id => preciosById[id]).filter(precio => precio !== undefined)
    }

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
        }}>
            {children}
        </DataContext.Provider>
    )
}
