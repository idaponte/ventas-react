import { createContext, useState } from "react"
import { Fetch } from "../services/fetch"
import { hashPsw } from "../utils/hashPsw"
import { showToast } from "../utils/showToast"
import { saveToSecureStorage } from "../utils/secureStorage"

export const AuthContext = createContext({
    login: () => { },
    logout: () => { },
    user: null,
    isLogged: false
})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)


    const login = async () => {
        try {
            const resp = await Fetch.post('api/login', {
                'username': 'ebaioni',
                'password': hashPsw('123'),
                'uuid': 'device.uuid',
                'version': 'prueba'
            })



            setUser(resp.data)
            setIsLogged(true)



        } catch (error) {
            console.error('error', error.message)
            showToast(error.message)
        }
    }

    const logout = async () => {
        try {
            const resp = await Fetch.get('api/logout')

            if (resp.status !== 200) throw new Error('Error al cerrar sesión')

            setUser(null)
            setIsLogged(false)


        } catch (error) {
            console.error(error)
        }
    }



    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
            isLogged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider