import Formulario from '../screens/Formulario';
import Agenda from '../screens/Agenda';
import Presupuestos from '../screens/Presupuestos';

import { globalColors } from '../styles/globals';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Drawer as DrawerContent } from '../components/ui';

const Drawer = createDrawerNavigator();


const DrawerNavigator = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Formulario"
            screenOptions={{
                headerShown: true,
                statusBarColor: 'transparent',
                headerStyle: { backgroundColor: globalColors.primary[700] },
                headerTitleStyle: { color: 'white' },
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

export default DrawerNavigator