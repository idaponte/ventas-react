import { createContext, useState } from "react"
import { Fetch } from "../services/fetch"
import { hashPsw } from "../utils/hashPsw"

export const AuthContext = createContext({
    login: () => { },
    logout: () => { },
    user: null
})

const AuthProvider = ({ children }) => {

    const login = async () => {
        try {
            const resp = await Fetch.post('api/login', {
                'username': 'ebaioni',
                'password': hashPsw('123'),
                'uuid': 'device.uuid',
                'version': 'prueba'
            })



        } catch (error) {
            console.error(error)
        }
    }

    const logout = async () => {
        try {
            const resp = await Fetch.get('api/logout')

        } catch (error) {
            console.error(error)
        }
    }

    const [user, setUser] = useState(null)



    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider