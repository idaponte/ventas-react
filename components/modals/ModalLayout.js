import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'

export const ModalLayout = ({
    children,
    isVisible,
    setIsVisible,
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                console.log('onRequestClose')
                setIsVisible(!isVisible)
            }}
        >
            <TouchableOpacity
                activeOpacity={1}
                style={styles.modalOverlay}
                onPressOut={() => setIsVisible(!isVisible)}
            >
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: 0,
                        margin: 0,
                        maxHeight: '70%',
                        width: '85%'
                    }}
                    onStartShouldSetResponder={() => true}
                    onPress={(e) => e.stopPropagation()}
                >
                    {children}
                </View>
            </TouchableOpacity >
        </Modal>
    )
}

const ModalContent = ({ children }) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                maxHeight: '100%',
                width: '100%',
                borderRadius: 20,
                padding: 20,
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false} >
                {children}
            </ScrollView>
        </View>

    )
}

ModalLayout.Content = ModalContent


const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})