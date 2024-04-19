
import React, { useState } from 'react'
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
    const [focused, setFocused] = useState(false)

    return (
        <View style={styles.inputContainer}>
            <Text style={{
                ...styles.label,
                display: label.length ? 'flex' : 'none',
            }}>
                {label}
            </Text>
            <TextInput
                style={{
                    ...styles.input,
                    borderColor: focused ? '#000' : '#a8a8a8',
                }}
                cursorColor='black'
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={placeholder}
                value={value}
                onChangeText={onChange}
                multiline={multiline}
                numberOfLines={numberOfLines}
                keyboardType={keyboardType}
                textAlignVertical={multiline ? 'top' : 'center'}
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
        fontSize: 14,
        marginBottom: 5
    },
    input: {
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderColor: '#a8a8a8',
        borderRadius: 7,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        maxWidth: '100%',
        padding: 15,
    },
    inputFocused: {
        borderColor: '#000',
    }
})