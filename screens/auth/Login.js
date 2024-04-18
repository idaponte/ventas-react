import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { globalColors } from '../../styles/globals';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

const Login = () => {

    const getSaludo = () => {
        const hora = new Date().getHours() - 3
        console.log(hora)
        if (hora < 12) {
            return 'Buenos días'
        } else if (hora < 18) {
            return 'Buenas tardes'
        } else {
            return 'Buenas noches'
        }
    }

    const { login } = useContext(AuthContext)


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

            <View style={{ backgroundColor: 'white', width: '100%', height: '70%', borderTopLeftRadius: 30, borderTopRightRadius: 30, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 150 }}>
                <TextInput style={{ width: '80%', padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0', marginBottom: 20 }} placeholder="Usuario" />
                <TextInput style={{ width: '80%', padding: 15, borderRadius: 10, backgroundColor: '#f0f0f0', marginBottom: 40 }} placeholder="Contraseña" secureTextEntry />
                <TouchableOpacity style={{ width: '80%', padding: 15, borderRadius: 10, backgroundColor: globalColors.primary[700], alignItems: 'center' }} onPress={login}>
                    <Text style={{ color: 'white', fontSize: 20 }}>Iniciar sesión</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient >
    )
}

export default Login