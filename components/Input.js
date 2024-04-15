
import React from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'

export const Input = ({
    label = '',
    placeholder = '',
    value = '',
    onChange = () => { },
    multiline = false,
    numberOfLines = 1,
    keyboardType = 'default',
}) => {
    return (
        <View style={styles.inputContainer}>
            {label.length && <Text style={styles.label}>{label}</Text>}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                multiline={multiline}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
            />
        </View>
    )
}



const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
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
})