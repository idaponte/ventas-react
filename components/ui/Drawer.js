import { useContext, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Button } from './Button';
import { Column } from './Column';
import { globalColors } from '../../styles/globals';
import { AuthContext } from '../../contexts/AuthProvider';
import { PresupuestoServiceContext } from '../../contexts/PresupuestosService';
import { showToast } from '../../utils/showToast';
import { ValidateSessionModal } from '../presupuestos/ValidateSessionModal';

export const Drawer = (props) => {

    const { logout, user } = useContext(AuthContext)
    const { isSync } = useContext(PresupuestoServiceContext)


    const handleLogout = async () => {
        if (!isSync) {
            showToast('Debe sincronizar antes de cerrar sesión', 'error')
            return
        }

        await logout()
    }

    const [modalVisible, setModalVisible] = useState(false)

    return (
        <>
            <ValidateSessionModal visible={modalVisible} setVisible={setModalVisible} />

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
                        onPress={() => setModalVisible(true)}
                    />
                    <Button
                        color={globalColors.danger[600]}
                        underlayColor={globalColors.danger[800]}
                        style={{ marginHorizontal: 20 }}
                        title='Cerrar sesión' // TODO: si no sincronizó no puede cerrar sesión
                        onPress={() =>
                            Alert.alert('Cerrar sesión', '¿Está seguro que desea cerrar sesión?', [
                                {
                                    text: 'Cancelar', onPress: () => {
                                        console.log('Cancelado')
                                    }, style: 'cancel'
                                },
                                { text: 'Aceptar', onPress: () => handleLogout() },
                            ])
                        }
                    />
                </Column>

            </DrawerContentScrollView>
        </>

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