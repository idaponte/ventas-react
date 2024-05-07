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

    const { presupuesto } = useContext(PresupContext);

    const showPresupuesto = () => {
        console.log(presupuesto)
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
                            <IconButton icon="plus" style={{ backgroundColor: 'transparent' }} size={24} color="white" onPress={showPresupuesto} />
                            <IconButton icon="bug" style={{ backgroundColor: 'transparent' }} size={24} color="white" onPress={showPresupuesto} />
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
            <Drawer.Screen name="Formulario" component={Formulario} />
            <Drawer.Screen name="Agenda" component={Agenda} />
            <Drawer.Screen name="Presupuestos" component={Presupuestos} />
        </Drawer.Navigator>
    )
}

export default MiAppState;