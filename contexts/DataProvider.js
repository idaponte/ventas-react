import { createContext, useEffect, useState } from "react";
import { getData } from "../services/getData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [data, setData] = useState({
        bonifs: [],
        meses: [],
        tipoinstalaciones: [],
        rubros: [],
        dolar: [],
        precios: [],
    })

    useEffect(() => {
        getData().then(response => {


            for (const key in response) {
                setData(prevState => ({
                    ...prevState,
                    [key]: response[key]
                }))
            }
        })
    }, [])

    // print precios
    useEffect(() => {
        console.log(data.precios)
    }, [data.precios])

    return (
        <DataContext.Provider value={{
            ...data
        }}>
            {children}
        </DataContext.Provider>
    )
}
