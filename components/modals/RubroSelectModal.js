import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ModalLayout } from './ModalLayout'

export const RubroSelectModal = ({
    isVisible,
    setIsVisible
}) => {

    const data = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ];

    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={styles.modalContent}>
                <FlatList data={data} renderItem={({ item }) => (
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Text>{item.label}</Text>
                    </TouchableOpacity>
                )} />
            </View>
        </ModalLayout>
    )
}


const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        height: '70%',
        width: '85%',
        borderRadius: 20,
        padding: 20,
    },
})