import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Divider } from '@rneui/themed'
import { ModalLayout } from '../modals/ModalLayout'
import { globalStyles } from '../../styles/globals'
import { Button, Input, IconButton } from '../ui'

const PersonaInfo = ({ title, info }) => {
    return (
        <>
            <Text style={{ fontSize: 18, marginTop: 20, fontWeight: '600' }}>
                {title}
            </Text>

            <Text style={{ fontSize: 20 }}>
                {info}
            </Text>
        </>
    )

}



export const CustomAgendaItem = ({
    onPress,
    fecha,
    hora,
    nombre,
}) => {
    const [show, setShow] = useState(false)
    const navigation = useNavigation()

    return (
        <>
            <TouchableOpacity style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
            }}
                onPress={() => setShow(true)}
            >
                <Text>{nombre}</Text>
                <Text>{fecha + " " + hora}</Text>
            </TouchableOpacity>

            <ModalLayout isVisible={show} setIsVisible={setShow}>
                <ModalLayout.Content>
                    <Text style={{
                        fontSize: 24,
                        marginBottom: 20,
                    }}>
                        {nombre}
                    </Text>
                    <Divider />

                    <PersonaInfo title="Domicilio" info={'Calle falsa 123'} />
                    <PersonaInfo title="Fecha y hora" info={fecha + " " + hora} />
                    <PersonaInfo title="Telefono" info={'123456789'} />

                    <Text style={{ fontSize: 18, marginTop: 20, fontWeight: '600' }}>
                        Observaciones
                    </Text>

                    {/* Chat box */}
                    <View style={{
                        ...globalStyles.input,
                        marginVertical: 10,
                        height: 200,
                        overflow: 'scroll',
                        flexDirection: 'column',
                    }}>
                        <Text>Chat</Text>
                    </View>

                    {/* input */}
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        justifyContent: 'space-between',
                    }}>
                        <Input
                            value=""
                            onChange={() => { }}
                            multiline={true}
                            keyboardType="default"
                        />

                        <IconButton
                            icon="arrow-up"
                            onPress={() => { }}
                            size={15}
                            color={'white'}
                            style={{
                                borderRadius: 50,
                                padding: 10,
                            }}
                        />

                    </View>

                    <Button.Close
                        title="Iniciar presupuesto"
                        onPress={() => navigation.navigate('Formulario')}
                        style={{
                            marginTop: 20
                        }}
                    />

                    <Button
                        title="Cerrar"
                        onPress={() => setShow(false)}
                        style={{
                            marginTop: 10,
                            backgroundColor: 'grey'
                        }}
                    />
                </ModalLayout.Content>
            </ModalLayout>

        </>

    )
}
