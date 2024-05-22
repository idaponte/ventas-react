import Formulario from '../screens/Formulario';
import Agenda from '../screens/Agenda';
import Presupuestos from '../screens/Presupuestos';

import { globalColors } from '../styles/globals';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Drawer as DrawerContent, Row, Button, IconButton } from '../components/ui';
import { DataProvider } from '../contexts/DataProvider';
import PresupProvider, { PresupContext } from '../contexts/PresupProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useContext } from 'react';
import PresupuestosService from '../contexts/PresupuestosService';
import AgendaService from '../contexts/AgendaService';
import { Alert } from 'react-native';

const Drawer = createDrawerNavigator();


const MiAppState = () => {
    return (
        <DataProvider>
            <PresupProvider>
                <AgendaService>
                    <PresupuestosService>
                        <AgendaService>
                            <DrawerNavigator />
                        </AgendaService>
                    </PresupuestosService>
                </AgendaService>
            </PresupProvider>
        </DataProvider>
    )
}

const DrawerNavigator = () => {
    const { presupuesto, createEmptyPresupuesto, hasPresupComunicador, setPresupuesto } = useContext(PresupContext);

    const showPresupuesto = () => {
        setPresupuesto(oldpresup => ({
            ...oldpresup,
            customer: {
                ...oldpresup.customer,
                name: 'Ignacio',
                ape: 'Baguinho',
                domicilio: {
                    ...oldpresup.customer.domicilio,
                    calle: '123',
                    nro: '456',
                    ciudad: 'La plata',
                    cp: '1900',
                },
                contacto: {
                    ...oldpresup.customer.contacto,
                    email: 'daponteignacio@gmail.com',
                }
            },
        }))
    }

    const newPresup = () => {
        Alert.alert('Crear nuevo presupuesto', 'Si creas un nuevo presupuesto se va a perder el contenido del actual.', [
            {
                text: 'Cancelar',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'Aceptar',
                onPress: createEmptyPresupuesto
            },
        ])
    }

    const screenOptions = {
        headerShown: true,
        headerTintColor: 'white',
        statusBarColor: 'transparent',
        headerStyle: { backgroundColor: globalColors.primary[700] },
        headerTitleStyle: { color: 'white' },
        headerRight: () => {
            return (
                <Row style={{ gap: 20, marginRight: 20 }}>
                    <IconButton icon="plus" style={{ backgroundColor: 'transparent', padding: 5 }} size={24} color="white" onPress={newPresup} />
                    {__DEV__ && <IconButton icon="bug" style={{ backgroundColor: 'transparent', padding: 5 }} size={24} color="white" onPress={showPresupuesto} />}
                </Row>
            )
        }

    }

    return (
        <Drawer.Navigator
            initialRouteName="Agenda"
            screenOptions={screenOptions}
            drawerContent={(props) => <DrawerContent {...props} />}

        >
            <Drawer.Screen name="Formulario" component={Formulario} options={{ title: `ID: ${`${presupuesto.oper.presup_id}`.toUpperCase()}` }} />
            <Drawer.Screen name="Agenda" component={Agenda} />
            <Drawer.Screen name="Presupuestos" component={Presupuestos} />
        </Drawer.Navigator>
    )
}

export default MiAppState;