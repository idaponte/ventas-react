import { Modal, ScrollView, StyleSheet, View } from 'react-native'

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
            onRequestClose={() => setIsVisible(!isVisible)}
        >
            <View style={styles.modalOverlay}>
                {children}
            </View>
        </Modal>
    )
}

const ModalContent = ({ children }) => {
    return (
        <View style={{
            backgroundColor: 'white',
            height: '70%',
            width: '85%',
            borderRadius: 20,
            padding: 20,
        }}>
            <ScrollView>
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