import { Modal, StyleSheet, View } from 'react-native'

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