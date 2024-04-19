import { createContext, useEffect, useState } from "react";
import { getData } from "../services/getData";

export const DataContext = createContext({
    bonifs: [],
    meses: [],
    tipoinstalaciones: [],
    rubros: [],
    dolar: [],
    precios: [],
    preciosById: {},
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



    return (
        <DataContext.Provider value={{
            ...data,
            preciosById,
            searchPrecios,
            getRubroById,
            getPrecioById,
            getPreciosById
        }}>
            {children}
        </DataContext.Provider>
    )
}
