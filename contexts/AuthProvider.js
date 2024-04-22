import { createContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"
import { hashPsw } from "../utils/hashPsw"
import { showToast } from "../utils/showToast"
import { SecureStorage, saveToSecureStorage } from "../utils/secureStorage"

export const AuthContext = createContext({
    login: () => { },
    logout: () => { },
    loading: true,
    user: null,
    isLogged: false
})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        SecureStorage.getData('user').then((user) => {
            const parsedUser = JSON.parse(user)
            if (user) {
                setUser(parsedUser)
            }

        }).catch((error) => {
            console.error('error', error)
            setUser(null)
        })

        setLoading(false)


    }, [])

    useEffect(() => {
        console.log('user', user)
        setIsLogged(user !== null && user !== undefined)
    }, [user])


    const login = async ({ username, password }) => {

        try {
            const resp = await Fetch.post('api/login', {
                'username': username,
                'password': hashPsw(password),
                'uuid': 'device.uuid',
                'version': 'prueba'
            })

            setUser(resp.data)
            await SecureStorage.setData('user', JSON.stringify(resp.data))

            setLoading(false)

        } catch (error) {
            console.error('error', error.message)
            showToast(error.message)
        }
    }

    const logout = async () => {
        try {
            // const resp = await Fetch.get('api/logout')

            // if (resp.status !== 200) throw new Error('Error al cerrar sesión')

            setUser(null)
            await SecureStorage.removeData('user')


        } catch (error) {
            console.error(error)
        }
    }



    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
            isLogged,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider