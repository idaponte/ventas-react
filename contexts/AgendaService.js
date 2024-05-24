import { createContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const AgendaContext = createContext({
    agenda: []
})

export const AgendaService = ({ children }) => {
    const [agenda, setAgenda] = useState([])

    const getRemoteAgenda = async () => {
        console.log('getRemoteAgenda')
        try {
            const { data } = await Fetch.get('agenda')

            await AsyncStorage.setItem('agenda', JSON.stringify(data))
            setAgenda({ agenda: data })
        } catch (error) {
            console.log(error)
        }
    }

    const getLocalAgenda = async () => {
        console.log('getLocalAgenda')
        try {
            const agenda = await AsyncStorage.getItem('agenda')

            if (agenda) {
                setAgenda(JSON.parse(agenda))
                return
            }

            getRemoteAgenda()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getLocalAgenda()
    }, [])

    return (
        <AgendaContext.Provider value={{ agenda }}>
            {children}
        </AgendaContext.Provider>
    )
}

// export default AgendaService