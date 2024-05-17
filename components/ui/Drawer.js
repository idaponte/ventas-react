import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { Column } from './Column';
import { globalColors } from '../../styles/globals';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import CustomAlert from '../CustomAlert';
import { PresupuestoServiceContext } from '../../contexts/PresupuestosService';
import { showToast } from '../../utils/showToast';

export const Drawer = (props) => {

    const { logout, login, user } = useContext(AuthContext)
    const { isSync } = useContext(PresupuestoServiceContext)

    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const handleAccept = async () => {
        const error = await login({ username: user.username, password: message })

        if (error.length) {
            setError(error)
            return
        }
        console.log('0fsadfasdfsda')
        setMessage('')
        setError('')
        setVisible(false)
        props.navigation.navigate('Presupuestos')
    }

    const handleCancel = () => {
        setMessage('')
        setVisible(false)
    }

    const handleLogout = async () => {
        if (!isSync) {
            showToast('Debe sincronizar antes de cerrar sesión', 'error')
            return
        }

        await logout()
    }

    return (
        <DrawerContentScrollView {...props} >

            <View style={styles.drawerHeader}>
                <Text style={{ color: 'white', fontSize: 25, fontWeight: '600' }}>
                    {user?.username}
                </Text>
            </View>

            <View>
                <DrawerItem
                    icon={({ color, size }) => <Icon name="calendar" size={size} color={color} />}
                    label="Agenda"
                    onPress={() => props.navigation.navigate('Agenda')}
                />

                <DrawerItem
                    icon={({ color, size }) => <Icon name="list" size={size} color={color} />}
                    label="Presupuestos"
                    onPress={() => props.navigation.navigate('Presupuestos')}
                />

                <DrawerItem
                    icon={({ color, size }) => <Icon name="table" size={size} color={color} />}
                    label="Formulario"
                    onPress={() => props.navigation.navigate('Formulario')}
                />
            </View>

            <Column style={{ gap: 20, marginTop: '100%' }}>
                <Button
                    variant='outlined'
                    title='Sincronizar'
                    style={{ marginHorizontal: 20 }}
                    onPress={() => setVisible(true)}
                />
                <Button
                    color={globalColors.danger[600]}
                    underlayColor={globalColors.danger[800]}
                    style={{ marginHorizontal: 20 }}
                    title='Cerrar sesión' // TODO: si no sincronizó no puede cerrar sesión
                    onPress={() =>
                        Alert.alert('Cerrar sesión', '¿Está seguro que desea cerrar sesión?', [
                            { text: 'Cancelar', onPress: () => { }, style: 'cancel' },
                            { text: 'Aceptar', onPress: () => handleLogout() },
                        ])
                    }
                />
            </Column>

            <CustomAlert visible={visible} onRequestClose={() => setVisible(false)}>
                <CustomAlert.Header>
                    <Text>Confirmación</Text>
                </CustomAlert.Header>
                <CustomAlert.Body>
                    <Column style={{ height: 80 }}>
                        <CustomAlert.Input placeholder='Ingrese su contraseña' onChangeText={setMessage} text={message} isPsw />
                        {error && <Text style={{ color: 'red' }}>{error}</Text>}
                    </Column>
                </CustomAlert.Body>
                <CustomAlert.Footer>
                    <CustomAlert.Button onPress={handleCancel}>Cancelar</CustomAlert.Button>
                    <CustomAlert.Button onPress={handleAccept}>Aceptar</CustomAlert.Button>
                </CustomAlert.Footer>
            </CustomAlert>
        </DrawerContentScrollView>
    );
}




const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: globalColors.primary[700],
        width: '100%',
        height: 150,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },

})