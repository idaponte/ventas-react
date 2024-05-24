import { useContext } from 'react';
import { Alert } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Formulario from '../screens/Formulario';
import Agenda from '../screens/Agenda';
import Presupuestos from '../screens/Presupuestos';

import { globalColors } from '../styles/globals';


import { Drawer as DrawerContent, Row, IconButton } from '../components/ui';
import { DataProvider, AgendaService, PresupuestosService, PresupProvider, PresupContext } from '../contexts';
import { getRandomLastName, getRandomName } from '../utils/getRandomData';

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
    const { presupuesto, createEmptyPresupuesto, setPresupuesto, addRandomItem } = useContext(PresupContext);

    const showPresupuesto = () => {

        addRandomItem(3)


        setPresupuesto(oldpresup => ({
            ...oldpresup,
            customer: {
                ...oldpresup.customer,
                name: getRandomName(),
                ape: getRandomLastName(),
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
            initialRouteName="Formulario"
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