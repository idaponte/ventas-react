import { useContext, useState } from 'react'
import CustomAlert from '../CustomAlert'
import { PresupuestoServiceContext } from '../../contexts/PresupuestosService'
import { DataContext } from '../../contexts/DataProvider'
import { Text } from 'react-native'
import { Column } from '../ui/Column'

export const ValidateSessionModal = ({
    visible = false,
    setVisible = () => { },
    validateSession = async () => { },
}) => {
    const [error, setError] = useState('')
    const [isSyncing, setIsSyncing] = useState(false)
    const [password, setPassword] = useState('')

    const { syncPresupuestos } = useContext(PresupuestoServiceContext)
    const { getRemoteData } = useContext(DataContext)



    const handleAccept = async () => {
        setIsSyncing(true)
        const errorMsg = await validateSession(password)

        if (errorMsg.length) {
            setError(errorMsg)
            setIsSyncing(false)
            return
        }

        setPassword('')
        setError('')
        setIsSyncing(false)

        console.log('syncing')

        await getRemoteData()
        await syncPresupuestos()

        setVisible(false)
    }

    const handleCancel = () => {
        setPassword('')
        setError('')
        setVisible(false)
    }

    return (
        <CustomAlert visible={visible} onRequestClose={() => setVisible(false)}>
            <CustomAlert.Header>
                <Text>Confirmación</Text>
            </CustomAlert.Header>
            <CustomAlert.Body>
                <Column style={{ height: 80 }}>
                    <CustomAlert.Input placeholder='Ingrese su contraseña' onChangeText={setPassword} text={password} isPsw />
                    {error && <Text style={{ color: 'red' }}>{error}</Text>}
                </Column>
            </CustomAlert.Body>
            <CustomAlert.Footer>
                <CustomAlert.Button disabled={isSyncing} onPress={handleCancel}>Cancelar</CustomAlert.Button>
                <CustomAlert.Button disabled={isSyncing} onPress={handleAccept}>Aceptar</CustomAlert.Button>
            </CustomAlert.Footer>
        </CustomAlert>
    )
}
