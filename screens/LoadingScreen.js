import { ModalLayout } from '../components/modals/ModalLayout'
import { ActivityIndicator } from 'react-native'
import { globalColors } from '../styles/globals'

const LoadingScreen = () => {
    return (
        <ModalLayout>
            <ActivityIndicator size='large' color={globalColors.primary[500]} />
        </ModalLayout>
    )
}

export default LoadingScreen