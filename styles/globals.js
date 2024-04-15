import { StyleSheet } from "react-native";

export const globalColors = {
    primary: {

        '50': '#eff7ff',
        '100': '#daebff',
        '200': '#bddeff',
        '300': '#90c9ff',
        '400': '#5babff',
        '500': '#3589fc',
        '600': '#1f69f1',
        '700': '#1752db',
        '800': '#1a44b3',
        '900': '#1b3c8d',
        '950': '#152756',
    },
    danger: '#ff0000',
    success: '#23a303',
}


export const globalStyles = StyleSheet.create({
    price: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold'
    },
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
        padding: 15,
        borderWidth: 1,
        borderColor: '#a8a8a8',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 24
    },
    searchButton: {
        backgroundColor: 'red',
    },
    inputBorder: {
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 7,
    }
})