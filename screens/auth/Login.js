import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { globalColors } from '../../styles/globals';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {
    const { login } = useContext(AuthContext)

    const [user, setUser] = useState({
        username: 'emarconi',
        password: '123'
    })

    const getSaludo = () => {
        const hora = new Date().getHours() - 3
        if (hora < 12) {
            return 'Buenos días'
        } else if (hora < 18) {
            return 'Buenas tardes'
        } else {
            return 'Buenas noches'
        }
    }


    const handleChange = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    return (
        <LinearGradient
            colors={['rgb(2,95,250)', 'rgb(16,2,250)']}
            style={{ flex: 1, justifyContent: 'flex-end' }}
        >
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: 20,
                marginBottom: 20,
            }}>
                <Text style={{ color: 'white', fontWeight: '600', fontSize: 30 }}>Login - Ventas</Text>
                <Text style={{ color: 'white', fontSize: 20 }}>{getSaludo()}</Text>
            </View>

            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder="Usuario" onChange={(value) => handleChange('username', value)} value={user.username} />
                <TextInput style={styles.input} placeholder="Contraseña" onChange={(value) => handleChange('password', value)} value={user.password} secureTextEntry />
                <TouchableOpacity style={styles.button} onPress={() => login(user)}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    )
}

const styles = StyleSheet.create({
    inputContainer: { backgroundColor: 'white', width: '100%', height: '70%', borderTopLeftRadius: 30, borderTopRightRadius: 30, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 150 },
    input: { width: '80%', padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0', marginBottom: 20 },
    button: { width: '80%', padding: 15, borderRadius: 10, backgroundColor: globalColors.primary[700], alignItems: 'center' },
})
export default Login