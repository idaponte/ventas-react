import { createContext, useContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"
import LoadingScreen from "../screens/LoadingScreen"
import { AuthContext } from "./AuthProvider"
import { PresupuestoModel } from "../models/PresupModel"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { showToast } from "../utils/showToast"
import { MonssaPresupModel } from "../models/MonssaPresupModel"

export const PresupuestoServiceContext = createContext({
    presupuestos: [],
    presupuestosToCreate: [],
    presupuestosToUpdate: [],
    isSync: true,
    storePresupuesto: async (presupuesto) => { },
    isPresupNew: (presup_id) => { },
})


const PresupuestosService = ({ children }) => {
    const { prevLogged, loading: authLoading } = useContext(AuthContext)
    const [loading, setLoading] = useState(true)


    const [state, setState] = useState({
        presupuestos: {},
        presupuestosToCreate: {},
        presupuestosToUpdate: {},
    })

    const isSync = Object.keys(state.presupuestosToCreate).length === 0 && Object.keys(state.presupuestosToUpdate).length === 0

    const syncPresupuestosToCreate = async () => {
        /* TODO: sync presupuestosToCreate with server
         if (creating) {
      map['presup'].removeWhere((key, value) => key == "intobserv_new");
    }
        */
    }

    const addNewPresup = async (presupuesto) => {
        try {

            const presupuestosToCreate = {
                ...state.presupuestosToCreate,
                [presupuesto.presup.presup_id]: presupuesto
            }

            setState(oldState => ({
                ...oldState,
                presupuestosToCreate
            }))

            await savePresupuestosToLS('presupuestosToCreate', presupuestosToCreate)
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const updatePresup = async (presupuesto) => {
        try {
            const presupId = presupuesto.presup.presup_id

            if (state.presupuestos[presupId]) {
                const presupDraft = { ...state.presupuestos }
                delete presupDraft[presupId]

                const presupuestosToUpdate = { ...state.presupuestosToUpdate }
                presupuestosToUpdate[presupId] = presupuesto

                setState(oldState => ({
                    ...oldState,
                    presupuestos: presupDraft,
                    presupuestosToUpdate
                }))

                await savePresupuestosToLS('presupuestosToUpdate', presupuestosToUpdate)
                await savePresupuestosToLS('presupuestos', presupDraft)
            } else if (state.presupuestosToCreate[presupId]) {
                const presupuestosToCreateDraft = { ...state.presupuestosToCreate }
                delete presupuestosToCreateDraft[presupId]

                const presupuestosToUpdate = { ...state.presupuestosToUpdate }
                presupuestosToUpdate[presupId] = presupuesto

                setState(oldState => ({
                    ...oldState,
                    presupuestosToCreate: presupuestosToCreateDraft,
                    presupuestosToUpdate
                }))

                await savePresupuestosToLS('presupuestosToUpdate', presupuestosToUpdate)
                await savePresupuestosToLS('presupuestosToCreate', presupuestosToCreateDraft)
            }



            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    const storePresupuesto = async (presupuesto) => {
        const monssaPresup = new MonssaPresupModel(presupuesto)
        let exito = false

        if (isPresupNew(monssaPresup.presup.presup_id)) {
            exito = await addNewPresup(monssaPresup)
        } else {
            exito = await updatePresup(monssaPresup)
        }

        showToast('Presupuesto guardado correctamente')

        return exito
    }


    const getLocalPresups = async () => {
        const presupuestosRAW = await AsyncStorage.getItem('presupuestos')
        const presupuestosToCreateRAW = await AsyncStorage.getItem('presupuestosToCreate')
        const presupuestosToUpdateRAW = await AsyncStorage.getItem('presupuestosToUpdate')

        const presupuestos = JSON.parse(presupuestosRAW) || {}
        const presupuestosToCreate = JSON.parse(presupuestosToCreateRAW) || {}
        const presupuestosToUpdate = JSON.parse(presupuestosToUpdateRAW) || {}


        setState(oldState => ({
            ...oldState,
            presupuestos,
            presupuestosToCreate,
            presupuestosToUpdate
        }))
    }

    const savePresupuestosToLS = async (key, value) => {
        console.log('saving to LS', key)
        await AsyncStorage.setItem(key, JSON.stringify(value))
    }

    const getRemotePresups = async () => {
        const resp = await Fetch.get('presupuestos')
        const presupuestosRemotos = resp.data

        const presupArr = Object.values(presupuestosRemotos)
        // let cant = 10
        // for (const presup of Object.values(presupuestosRemotos)) {
        //     if (!cant) break
        //     presupArr.push(presup)
        //     cant--
        // }

        const presupObj = {}

        for (const presup of presupArr) {
            presupObj[presup.presup.presup_id] = presup
        }

        setState(oldState => ({
            ...oldState,
            presupuestos: presupObj
        }))

        savePresupuestosToLS('presupuestos', presupObj)
    }

    const isPresupNew = (presup_id) => (
        !state.presupuestos[presup_id] &&
        !state.presupuestosToCreate[presup_id] &&
        !state.presupuestosToUpdate[presup_id]
    )


    const loadPresupuestos = async () => {
        if (prevLogged) {
            console.log('getting local presups')
            await getLocalPresups()
        } else {
            console.log('getting remote presups')
            await getRemotePresups()
        }

        setLoading(false)
    }

    useEffect(() => {
        loadPresupuestos()
    }, [authLoading, prevLogged])

    if (loading) return <LoadingScreen />

    return (
        <PresupuestoServiceContext.Provider value={{
            presupuestos: state.presupuestos,
            presupuestosToCreate: state.presupuestosToCreate,
            presupuestosToUpdate: state.presupuestosToUpdate,
            isSync,

            storePresupuesto,
            isPresupNew,
        }}>
            {children}
        </PresupuestoServiceContext.Provider>
    )
}

export default PresupuestosService