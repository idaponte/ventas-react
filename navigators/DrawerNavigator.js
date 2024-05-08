import Formulario from '../screens/Formulario';
import Agenda from '../screens/Agenda';
import Presupuestos from '../screens/Presupuestos';

import { globalColors } from '../styles/globals';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Drawer as DrawerContent, Row, Button, IconButton } from '../components/ui';
import { DataProvider } from '../contexts/DataProvider';
import PresupProvider, { PresupContext } from '../contexts/PresupProvider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useContext, useEffect } from 'react';
import PresupuestosService from '../contexts/PresupuestosService';
import AgendaService from '../contexts/AgendaService';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Drawer = createDrawerNavigator();


const MiAppState = () => {
    return (
        <DataProvider>
            <PresupProvider>
                <PresupuestosService>
                    <AgendaService>
                        <DrawerNavigator />
                    </AgendaService>
                </PresupuestosService>
            </PresupProvider>
        </DataProvider>
    )
}

const DrawerNavigator = () => {
    const { presupuesto, createEmptyPresupuesto } = useContext(PresupContext);

    const showPresupuesto = () => {
        console.log(presupuesto)
    }

    const newPresup = () => {
        Alert.alert('Crear nuevo presupuesto', 'Si creas un nuevo presupuesto se va a perder el contenido del actual.', [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK',
                onPress: createEmptyPresupuesto
            },
        ])
    }


    return (
        <Drawer.Navigator
            initialRouteName="Presupuestos"
            screenOptions={{
                headerShown: true,
                headerTintColor: 'white',
                statusBarColor: 'transparent',
                headerStyle: { backgroundColor: globalColors.primary[700] },
                headerTitleStyle: { color: 'white' },
                headerRight: () => {
                    return (
                        <Row style={{ gap: 20, marginRight: 20 }}>
                            <IconButton icon="plus" style={{ backgroundColor: 'transparent' }} size={24} color="white" onPress={newPresup} />
                            {__DEV__ && <IconButton icon="bug" style={{ backgroundColor: 'transparent' }} size={24} color="white" onPress={showPresupuesto} />}
                        </Row>
                    )
                }

            }}
            drawerContent={(props) => {
                return (
                    <DrawerContent {...props} />
                )
            }}

        >
            <Drawer.Screen options={{
                title: `Presupuesto: ${`${presupuesto.oper.presup_id}`.toUpperCase()}`,
            }} name="Formulario" component={Formulario} />
            <Drawer.Screen name="Agenda" component={Agenda} />
            <Drawer.Screen name="Presupuestos" component={Presupuestos} />
        </Drawer.Navigator>
    )
}

export default MiAppState;