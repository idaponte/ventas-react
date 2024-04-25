import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Alert, Linking, Text, View } from 'react-native';
import { Button } from './Button';
import { Column } from './Column';
import { globalColors } from '../../styles/globals';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import CustomAlert from '../CustomAlert';

export const Drawer = (props) => {

    const { logout, login, user } = useContext(AuthContext)

    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')

    const handleAccept = async () => {
        setVisible(false)
        await login({ username: user.username, password: message })
    }

    const handleCancel = () => {
        setMessage('')
        setVisible(false)
    }


    return (
        <DrawerContentScrollView {...props} >

            <View
                style={{
                    backgroundColor: globalColors.primary[700],
                    width: '100%',
                    height: 150,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 10,
                }}
            >
                <Text
                    style={{
                        color: 'white',
                        fontSize: 25,
                        fontWeight: '600',
                    }}
                >
                    Username
                </Text>
            </View>

            <View>
                <DrawerItem
                    icon={({ color, size }) => {
                        return <Icon name="calendar" size={size} color={color} />;
                    }}
                    label="Agenda"
                    onPress={() => props.navigation.navigate('Agenda')}
                />
                <DrawerItem
                    icon={({ color, size }) => {
                        return <Icon name="list" size={size} color={color} />;
                    }}
                    label="Presupuestos"
                    onPress={() => props.navigation.navigate('Presupuestos')}
                />

                <DrawerItem
                    icon={({ color, size }) => {
                        return <Icon name="table" size={size} color={color} />;
                    }}
                    label="Formulario"
                    onPress={() => props.navigation.navigate('Formulario')}
                />
            </View>

            <Column style={{ gap: 20, marginTop: '100%' }}>
                <Button
                    variant='outlined'
                    title='Sincronizar'
                    style={{ marginHorizontal: 20 }}
                    onPress={() => {
                        // implementar alert con prompt
                        setVisible(true)
                    }}
                />
                <Button
                    color={globalColors.danger}
                    style={{ marginHorizontal: 20 }}
                    title='Cerrar sesión'
                    onPress={() =>
                        Alert.alert('Cerrar sesión', '¿Está seguro que desea cerrar sesión?', [
                            {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: logout
                            },
                        ])
                    }
                />
            </Column>

            <CustomAlert visible={visible} onRequestClose={() => setVisible(false)}>
                <CustomAlert.Header>
                    <Text>Confirmación</Text>
                </CustomAlert.Header>
                <CustomAlert.Body>
                    <CustomAlert.Input onChangeText={setMessage} text={message} isPsw />
                </CustomAlert.Body>
                <CustomAlert.Footer>
                    <CustomAlert.Button onPress={handleCancel}>Cancelar</CustomAlert.Button>
                    <CustomAlert.Button onPress={handleAccept}>Aceptar</CustomAlert.Button>
                </CustomAlert.Footer>
            </CustomAlert>
        </DrawerContentScrollView>
    );
}