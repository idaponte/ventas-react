import Icon from 'react-native-vector-icons/FontAwesome5';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Alert, Linking, Text, View } from 'react-native';
import { Button } from './Button';
import { Column } from './Column';
import { globalColors } from '../../styles/globals';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';

export const Drawer = (props) => {

    const { logout } = useContext(AuthContext)

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
                    onPress={async () => {
                        Alert.prompt('Ingrese su contraseña', '', [
                            {
                                text: 'Cancelar',
                                onPress: () => console.log('Cancel Pressed'),
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: password => {
                                    console.log('OK Pressed', password);
                                    if (password === '1234') {
                                        Alert.alert('Sincronización exitosa', 'Los datos se han sincronizado correctamente')
                                    } else {
                                        Alert.alert('Error', 'La contraseña es incorrecta')
                                    }
                                }
                            },
                        ])
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


        </DrawerContentScrollView>
    );
}