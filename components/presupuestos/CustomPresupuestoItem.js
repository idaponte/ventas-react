import { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ModalLayout } from '../modals/ModalLayout'
import { RowBetween } from '../ui/Row'
import { Column, ColumnBetween } from '../ui/Column'
import { TextPrimary, TextSuccess } from '../ui/Text'
import { Button } from '../ui/Button'
import { useNavigation } from '@react-navigation/native'

export const CustomPresupuestoItem = ({
    domicilio,
    nombre,
    estado,
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
                borderLeftColor: 'green',
                borderLeftWidth: 8,
            }}
                onPress={() => setShow(true)}
            >
                <Text>{nombre}</Text>
                <Text>{domicilio}</Text>
                {/* <Text>{estado}</Text> */}
            </TouchableOpacity>

            <ModalLayout isVisible={show} setIsVisible={setShow}>
                <ModalLayout.Content>
                    <ColumnBetween>
                        <Column>
                            <RowBetween>
                                <Text style={{
                                    fontSize: 24,
                                    marginBottom: 20,
                                }}>
                                    Limpred S.A.
                                </Text>

                                <Text style={{
                                    fontSize: 18,
                                    marginBottom: 20,
                                }}>
                                    ID: 123456
                                </Text>
                            </RowBetween>

                            <TextSuccess weight='bold'>
                                Facturado - 28/12/2021
                            </TextSuccess>

                            <TextPrimary style={{ marginTop: 20 }} weight='bold'>
                                Domicilio
                            </TextPrimary>

                            <TextPrimary>
                                {domicilio}
                            </TextPrimary>
                        </Column>

                        <Button style={{ marginTop: 20 }} title='Ver' onPress={() => navigation.navigate('Formulario')} />
                        <Button style={{ marginTop: 20, backgroundColor: 'grey' }} title='Cerrar' onPress={() => setShow(false)} />
                    </ColumnBetween>

                </ModalLayout.Content>
            </ModalLayout>

        </>

    )
}
