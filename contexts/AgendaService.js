import { createContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"

export const AgendaContext = createContext({
    agenda: []
})

const AgendaService = ({ children }) => {
    const [agenda, setAgenda] = useState([])


    const getAgenda = async () => {

        // interface AgendaItem {
        //     name:        string;
        //     ape:         string;
        //     entre:       string;
        //     nro:         string;
        //     status:      string;
        //     creado:      Date;
        //     ciudad:      string;
        //     closeobserv: string;
        //     calle:       string;
        //     tel:         string;
        //     user_id:     number;
        //     call_id:     number; No se usan los siguientes campos ↓
        //     descr:       string;
        //     llamar:      boolean;
        //     my_comment:  string;
        //     ref_cli:     null;
        //     start:       Date;
        //     tipo:        string;
        //     update_at:   Date;
        //     vend_id:     number;
        //     zona_name:   string;
        //     rs:          null;
        // }



        try {
            const res = await Fetch.get('agenda')
            res.data.forEach(item => {
                setAgenda(oldAgenda => [...oldAgenda, item])
            }
            )
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getAgenda()
    }, [])

    return (
        <AgendaContext.Provider value={{
            agenda,
        }}>
            {children}
        </AgendaContext.Provider>
    )
}

export default AgendaService