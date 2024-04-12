import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DatosPersonales from "./formulario/DatosPersonales";
import Items from "./formulario/Items";
import AbonoForm from "./formulario/Abono";
import ResumenPresupuesto from "./formulario/ResumenPresupuesto";

const Stack = createNativeStackNavigator();

const Formulario = () => {
    const insets = useSafeAreaInsets();
    return (
        // <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Items" component={Items} />
            <Stack.Screen name="DatosPersonales" component={DatosPersonales} />
            <Stack.Screen name="Abono" component={AbonoForm} />
            <Stack.Screen name="ResumenPresupuesto" component={ResumenPresupuesto} />

        </Stack.Navigator>
        // </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: 20,
        gap: 20
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    inputContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
    },

    searchInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    label: {
        fontSize: 18,
        marginBottom: 5
    },
    input: {
        maxWidth: '100%',
        borderRadius: 7,
        padding: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#a8a8a8',
    },
    text: {
        fontSize: 24
    },
    searchButton: {
        backgroundColor: 'red',
    }
});


export default Formulario