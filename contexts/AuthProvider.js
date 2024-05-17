import { createContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"
import { hashPsw } from "../utils/hashPsw"
import { showToast } from "../utils/showToast"
import { SecureStorage, saveToSecureStorage } from "../utils/secureStorage"
import LoadingScreen from "../screens/LoadingScreen"

export const AuthContext = createContext({
    login: async () => { },
    logout: () => { },
    loading: true,
    user: null,
    isLogged: false
})

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [prevLogged, setPrevLogged] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        SecureStorage.getData('user').then((user) => {
            const parsedUser = JSON.parse(user)
            if (user) {
                setPrevLogged(true)
                setUser(parsedUser)
            }

        }).catch((error) => {
            console.error('error', error)
            setUser(null)
        })

        setLoading(false)
    }, [])

    useEffect(() => {
        if (user) console.log('user', user)
        setIsLogged(user !== null && user !== undefined)
    }, [user])


    const login = async ({ username, password }) => {
        let error = ''

        try {
            setLoading(true)

            const resp = await Fetch.post('login', {
                'username': username,
                'password': hashPsw(password),
                'uuid': 'device.uuid',
                'version': 'prueba'
            })

            setUser(resp.data)
            await SecureStorage.setData('user', JSON.stringify(resp.data))
            setPrevLogged(false)


        } catch (error) {
            console.log('error', error.message)
            error = error.message
        }

        setLoading(false)
        return error
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



    // if (loading) return <LoadingScreen />

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            user,
            isLogged,
            loading,
            prevLogged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider