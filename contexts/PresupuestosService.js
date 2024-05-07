import { createContext, useContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"
import LoadingScreen from "../screens/LoadingScreen"
import { getDom } from "../utils/getDom"
import { AuthContext } from "./AuthProvider"
import { PresupuestoModel } from "../models/PresupModel"
import { View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const PresupuestoServiceContext = createContext({
    presupuestos: [],
    presupuestosToCreate: [],
    presupuestosToUpdate: [],
})


const PresupuestosService = ({ children }) => {
    const { prevLogged, loading } = useContext(AuthContext)

    const [state, setState] = useState({
        presupuestos: [],
        presupuestosToCreate: [],
        presupuestosToUpdate: [],
    })


    const getLocalPresups = async () => {
        const presupuestosRAW = await AsyncStorage.getItem('presupuestos')

        const presupuestos = JSON.parse(presupuestosRAW)
        if (presupuestos) {
            setState(oldState => ({
                ...oldState,
                presupuestos: presupuestos
            }))
        }
    }

    const savePresupuestosToLS = async (presupuestos) => {
        await AsyncStorage.setItem('presupuestos', JSON.stringify(presupuestos))
    }

    const getRemotePresups = async () => {
        const resp = await Fetch.get('api/' + 'presupuestos')
        const presupuestosRemotos = resp.data

        const presupArr = []
        let cant = 10
        for (const presup of Object.values(presupuestosRemotos)) {
            if (!cant) break
            presupArr.push(presup)
            cant--
        }

        setState(oldState => ({
            ...oldState,
            presupuestos: presupArr
        }))

        savePresupuestosToLS(presupArr)
    }



    const loadPresupuestos = () => {
        if (prevLogged) {
            console.log('getting local presups')
            getLocalPresups()
        } else {
            console.log('getting remote presups')
            getRemotePresups()
        }
    }

    useEffect(() => {
        loadPresupuestos()
    }, [loading, prevLogged])

    if (
        !state.presupuestos.length
    ) {
        return <LoadingScreen />
    }

    return (
        <PresupuestoServiceContext.Provider value={{
            presupuestos: state.presupuestos,
            presupuestosToCreate: state.presupuestosToCreate,
            presupuestosToUpdate: state.presupuestosToUpdate,
        }}>
            {children}
        </PresupuestoServiceContext.Provider>
    )
}

export default PresupuestosService