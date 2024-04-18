import { createContext, useEffect } from "react";
import { getData } from "../services/getData";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

    useEffect(() => {
        getData()
    }, [])

    return (
        <DataContext.Provider value={{}}>
            {children}
        </DataContext.Provider>
    )
}
