import { createContext, useEffect, useState } from "react"
import { Fetch } from "../services/fetch"
import { hashPsw, SecureStorage } from "../utils"

export const AuthContext = createContext({
    login: async () => { },
    logout: async () => { },
    validateSession: async () => { },
    loading: true,
    user: null,
    isLogged: false
})

export const AuthProvider = ({ children }) => {

    const [authState, setAuthState] = useState({
        user: null,
        isLogged: false,
        prevLogged: false,
        loading: true,
    })


    const getUserFromStorage = async () => {
        console.log('getUserFromStorage')

        try {
            const user = await SecureStorage.getData('user')

            if (user) {
                console.log(user)

                setAuthState(prev => ({
                    ...prev,
                    prevLogged: true,
                    user: JSON.parse(user),
                    loading: false
                }))

                return
            }

            setAuthState(prev => ({
                ...prev,
                user: null,
                loading: false
            }))
        } catch (error) {
            console.error('error', error)


        }
    }

    const handleAuthState = () => {
        if (authState.user) console.log('user', authState.user)
        setAuthState(prev => ({
            ...prev,
            isLogged: authState.user !== null && authState.user !== undefined,
        }))
    }

    const login = async ({ username, password }) => {

        try {
            setAuthState(prev => ({ ...prev, loading: true }))

            const resp = await Fetch.post('login', {
                'username': username,
                'password': hashPsw(password),
                'uuid': 'device.uuid',
                'version': 'prueba'
            })

            await SecureStorage.setData('user', JSON.stringify(resp.data))

            setAuthState(prev => ({
                ...prev,
                user: resp.data,
                prevLogged: false,
                loading: false
            }))

        } catch (error) {
            console.log('error', error.message)
            setAuthState(prev => ({ ...prev, loading: false }))
        }
    }

    const logout = async () => {
        try {
            await SecureStorage.removeData('user')
            setAuthState(prev => ({ ...prev, user: null }))
        } catch (error) {
            console.error(error)
        }
    }

    const validateSession = async (password = '') => {
        try {

            await Fetch.post('login', {
                'username': authState.user.username,
                'password': hashPsw(password),
                'uuid': 'device.uuid',
                'version': 'prueba'
            })

            return ''
        } catch (error) {
            return error.message
        }

    }

    useEffect(() => { getUserFromStorage() }, [])
    useEffect(() => { handleAuthState() }, [authState.user])

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            validateSession,
            ...authState,
        }}>

            {children}
        </AuthContext.Provider>
    )
}

// export default AuthProvider