import { StyleSheet } from "react-native";

export const globalColors = {
    primary: {
        '50': '#edf8ff',
        '100': '#d6eeff',
        '200': '#b6e2ff',
        '300': '#84d2ff',
        '400': '#4ab7ff',
        '500': '#2094ff',
        '600': '#0874ff',
        '700': '#025ffa',
        '800': '#094ac4',
        '900': '#0e429a',
        '950': '#0e295d',
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
    },
    shadow: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
})