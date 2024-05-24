import { ModalLayout } from '../components/modals/ModalLayout'
import { ActivityIndicator } from 'react-native'
import { Text } from 'react-native'

const LoadingScreen = ({ msg = 'Cargando' }) => {
    return (
        <ModalLayout disabled>
            <ActivityIndicator size='100' color='white' />
            <Text style={{ color: 'white', fontWeight: '500', fontSize: 20 }}>{msg}</Text>
        </ModalLayout>
    )
}

export default LoadingScreen