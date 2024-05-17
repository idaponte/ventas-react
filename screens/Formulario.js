import { useSafeAreaInsets } from "react-native-safe-area-context";

import DatosPersonales from "./formulario/DatosPersonales";
import Items from "./formulario/Items";
import AbonoForm from "./formulario/Abono";
import ResumenPresupuesto from "./formulario/ResumenPresupuesto";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { globalColors } from "../styles/globals";
const Tab = createMaterialTopTabNavigator();


const Formulario = () => {
    const screenOptions = {
        tabBarStyle: {
            backgroundColor: globalColors.primary[700],

        },

        tabBarActiveTintColor: 'white',
        tabBarIndicatorStyle: {
            backgroundColor: 'white',
            height: 4,
        },
        tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 11,
        },

    }

    return (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Contacto">
            <Tab.Screen name="Contacto" component={DatosPersonales} />
            <Tab.Screen name="Items" component={Items} />
            <Tab.Screen name="Abono" component={AbonoForm} />
            <Tab.Screen name="Valores" component={ResumenPresupuesto} />
        </Tab.Navigator>
    )
}


export default Formulario