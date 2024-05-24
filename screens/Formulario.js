import { DatosPersonales, Items, Abono, ResumenPresupuesto } from "./formulario";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { globalColors as gc } from "../styles/globals";
const Tab = createMaterialTopTabNavigator();


const Formulario = () => {
    const screenOptions = {
        tabBarStyle: { backgroundColor: gc.primary[700] },
        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: { backgroundColor: 'white', height: 4 },
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 11 },
    }

    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Contacto">
            <Tab.Screen name="Contacto" component={DatosPersonales} />
            <Tab.Screen name="Items" component={Items} />
            <Tab.Screen name="Abono" component={Abono} />
            <Tab.Screen name="Valores" component={ResumenPresupuesto} />
        </Tab.Navigator>
    )
}


export default Formulario