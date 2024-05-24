import { Modal, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Icon } from "@rneui/themed";

export const ModalLayout = ({
    children,
    isVisible,
    setIsVisible,
    disabled = false
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
                console.log('onRequestClose')
                if (!disabled) setIsVisible(!isVisible)
            }}
        >
            <View style={styles.modalOverlay}>
                {children}

                <TouchableOpacity

                    onPress={() => {
                        if (!disabled) setIsVisible(!isVisible)
                    }}
                    style={{
                        display: disabled ? 'none' : 'flex',
                        position: 'absolute',
                        bottom: 35,
                        left: '50%',
                        transform: [{ translateX: -20 }],
                        borderRadius: 20,
                        backgroundColor: 'white',
                        padding: 5,
                    }}
                >
                    <Icon name="close" size={40} />
                </TouchableOpacity>

            </View >
        </Modal>
    )
}

const ModalContent = ({ children }) => {
    return (
        <View
            style={{
                backgroundColor: 'white',
                maxHeight: '100%',
                width: '80%',
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
        position: 'relative',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})