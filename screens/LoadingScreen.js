import { Text } from 'react-native'
import { ModalLayout } from '../components/modals/ModalLayout'
import { ActivityIndicator } from 'react-native-web'

const LoadingScreen = () => {
    return (
        <ModalLayout>
            <ModalLayout.Content>
                <Text>Cargando...</Text>
            </ModalLayout.Content>
        </ModalLayout>
    )
}

export default LoadingScreen