import { useSafeAreaInsets } from "react-native-safe-area-context";

import DatosPersonales from "./formulario/DatosPersonales";
import Items from "./formulario/Items";
import AbonoForm from "./formulario/Abono";
import ResumenPresupuesto from "./formulario/ResumenPresupuesto";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { globalColors } from "../styles/globals";
import { color } from "@rneui/base";
const Tab = createMaterialTopTabNavigator();


const Formulario = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: globalColors.primary[700],
                },
                tabBarActiveTintColor: 'white',
                tabBarIndicatorStyle: {
                    backgroundColor: 'white',
                    height: 4,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },

            }
            }

        >
            <Tab.Screen name="Items" component={Items} />
            <Tab.Screen name="Contacto" component={DatosPersonales} />
            <Tab.Screen name="Abono" component={AbonoForm} />
            <Tab.Screen name="Valores" component={ResumenPresupuesto} />
        </Tab.Navigator>
    )
}


export default Formulario