
import { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FlatListModal } from '../modals/FlatListModal'
import Icon from 'react-native-vector-icons/FontAwesome';

export const Dropdown = ({
    label = '',
    defaultValue = 'Seleccione una opción',
    value = '',
    onChange = () => { },
    data = [],
    editable = true
}) => {
    const [visible, setVisible] = useState(false)

    return (
        <>
            <View style={styles.inputContainer}>
                <Text style={{
                    ...styles.label,
                    display: label.length ? 'flex' : 'none',
                }}>
                    {label}
                </Text>
                <TouchableOpacity
                    style={styles.input}
                    disabled={!editable}
                    onPress={() => setVisible(true)}
                >
                    <Text style={{ textTransform: 'uppercase', color: editable ? '#000' : 'grey' }}>{value.length ? value : defaultValue}</Text>

                    <View style={{ position: 'absolute', right: 20 }}>
                        <Icon name='chevron-down' size={10} color='darkgrey' />
                    </View>

                </TouchableOpacity>
            </View>

            <FlatListModal isVisible={visible} setIsVisible={setVisible} data={data} onChange={onChange} />
        </>
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