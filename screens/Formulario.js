import { useSafeAreaInsets } from "react-native-safe-area-context";

import DatosPersonales from "./formulario/DatosPersonales";
import Items from "./formulario/Items";
import AbonoForm from "./formulario/Abono";
import ResumenPresupuesto from "./formulario/ResumenPresupuesto";

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const Tab = createMaterialTopTabNavigator();


const Formulario = () => {
    const insets = useSafeAreaInsets();
    return (
        <Tab.Navigator >
            <Tab.Screen name="Contacto" component={DatosPersonales} />
            <Tab.Screen name="Items" component={Items} />
            <Tab.Screen name="Abono" component={AbonoForm} />
            <Tab.Screen name="Valores" component={ResumenPresupuesto} />
        </Tab.Navigator>
    )
}


export default Formulario