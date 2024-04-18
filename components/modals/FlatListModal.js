import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ModalLayout } from './ModalLayout'


export const FlatListModal = ({
    isVisible,
    setIsVisible,
    data
}) => {
    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={styles.modalContent}>
                <FlatList data={data} renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                setIsVisible(false)
                            }}
                            style={{
                                padding: 10,
                                backgroundColor: index % 2 === 0 ? 'lightgrey' : 'white'
                            }}

                        >
                            <Text
                                style={{
                                    fontSize: 16,
                                    textTransform: 'uppercase'
                                }}
                            >{item.label}</Text>
                        </TouchableOpacity>
                    )
                }} />
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
