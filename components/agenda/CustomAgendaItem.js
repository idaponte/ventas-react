import { useContext, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Divider } from '@rneui/themed'
import { ModalLayout } from '../modals/ModalLayout'
import { globalStyles } from '../../styles/globals'
import { Button, Input, IconButton } from '../ui'
import { getHumanDate } from '../../utils/getHumanDate'
import { getDom } from '../../utils/getDom'
import { PresupContext } from '../../contexts/PresupProvider'

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



export const CustomAgendaItem = ({ data }) => {
    const [show, setShow] = useState(false)
    const navigation = useNavigation()

    const nombre = `${data.ape} ${data.name}`
    const fecha = getHumanDate(new Date(data.start), true)

    const { loadPresupuesto } = useContext(PresupContext)

    const {

    } = data

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
                <Text>{fecha}</Text>
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

                    <PersonaInfo title="Domicilio" info={getDom(data)} />
                    <PersonaInfo title="Fecha y hora" info={fecha} />
                    <PersonaInfo title="Teléfono" info={data.tel} />

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
                            style={{ borderRadius: 50, padding: 10 }}
                        />

                    </View>

                    <Button
                        title="Iniciar presupuesto"
                        onPress={() => {
                            loadPresupuesto({
                                presup: {
                                    ape: data.ape,
                                    name: data.name,
                                    calle: data.calle,
                                    ciudad: data.ciudad,
                                    entre: data.entre,
                                    nro: data.nro,
                                    user_id: data.user_id,
                                    vend_id: data.vend_id
                                }
                            })

                            navigation.navigate('Formulario')
                        }}
                        style={{ marginTop: 20 }}
                    />

                    <Button.Close
                        title="Cerrar"
                        onPress={() => setShow(false)}
                        style={{ marginTop: 10 }}
                    />
                </ModalLayout.Content>
            </ModalLayout>

        </>

    )
}
