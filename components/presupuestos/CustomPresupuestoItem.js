import { useContext, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ModalLayout } from '../modals/ModalLayout'
import { Column, ColumnBetween, Button, TextPrimary, TextSuccess, RowBetween } from '../ui'
import { getHumanDate } from '../../utils'
import { DomicilioModel } from '../../models/PresupModel'
import { PresupContext } from '../../contexts'
import { globalColors } from '../../styles/globals'

// PresupSF es un presupuesto sin formato, el cual se necesita para usarlo en PresupProvider
export const CustomPresupuestoItem = ({ presupuestoSF }) => {
    const [show, setShow] = useState(false)
    const navigation = useNavigation()
    const { loadPresupuesto } = useContext(PresupContext)

    const nombre = `${presupuestoSF.presup.ape} ${presupuestoSF.presup.name}`
    const domicilio = DomicilioModel.getDom(presupuestoSF.presup)


    const getColorByStatus = (str) => {
        if (typeof str !== 'string') return '#000'

        const status = str.toLowerCase();
        const acepta = presupuestoSF.presup.intobserv.toLowerCase().includes('acept');

        if (status === 'creado' && acepta) return '#f5e042';
        if (status === 'creado' && !acepta) return '#000';

        return globalColors.success[500]
    }

    const inicializarPresupuesto = () => {
        loadPresupuesto(presupuestoSF)
        navigation.navigate('Formulario')
        setShow(false)
    }

    const deleteDoubleBlank = (str) => str.replace(/\s+/g, ' ')


    return (
        <>
            <TouchableOpacity
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    paddingVertical: 20,
                    paddingLeft: 20,
                    paddingRight: 10,
                    borderRadius: 10,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.22,
                    shadowRadius: 2.22,
                    elevation: 3,
                    borderLeftColor: getColorByStatus(presupuestoSF.presup.status),
                    borderLeftWidth: 8,
                }}
                onPress={() => setShow(true)}
            >
                <Text numberOfLines={1} style={{ flex: 2, }} >{nombre}</Text>
                <Text style={{ flex: 1, textAlign: 'right', textTransform: 'uppercase' }}>ID {presupuestoSF.presup.presup_id}</Text>
            </TouchableOpacity>

            <ModalLayout isVisible={show} setIsVisible={setShow}>
                <ModalLayout.Content>
                    <ColumnBetween>
                        <Column>
                            <RowBetween wrap>
                                <Text style={{ fontSize: 24, marginBottom: 20 }}>
                                    {deleteDoubleBlank(nombre)}
                                </Text>

                                <Text style={{
                                    fontSize: 18,
                                    marginBottom: 20,
                                }}>
                                    ID: {presupuestoSF.abono.presup_id}
                                </Text>
                            </RowBetween>

                            <TextSuccess weight='bold'>
                                {presupuestoSF.presup.status} - {getHumanDate(presupuestoSF.presup.creado)}
                            </TextSuccess>

                            <TextPrimary style={{ marginTop: 20 }} weight='bold'>
                                Domicilio
                            </TextPrimary>

                            <TextPrimary>
                                {domicilio}
                            </TextPrimary>
                        </Column>

                        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 10, marginTop: 20 }}>
                            <Button.Close style={{ flex: 1 }} onPress={() => setShow(false)} />
                            <Button style={{ flex: 1 }} title='Ver' onPress={inicializarPresupuesto} />
                        </View>
                    </ColumnBetween>

                </ModalLayout.Content>
            </ModalLayout>

        </>

    )
}
