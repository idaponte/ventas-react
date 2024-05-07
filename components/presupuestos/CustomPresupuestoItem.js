import { useContext, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ModalLayout } from '../modals/ModalLayout'
import { RowBetween } from '../ui/Row'
import { Column, ColumnBetween } from '../ui/Column'
import { TextPrimary, TextSuccess } from '../ui/Text'
import { Button } from '../ui/Button'
import { useNavigation } from '@react-navigation/native'
import { getDom } from '../../utils/getDom'
import { getHumanDate } from '../../utils/getHumanDate'
import { DomicilioModel, PresupuestoModel } from '../../models/PresupModel'
import { PresupContext } from '../../contexts/PresupProvider'

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
        if (status == 'creado') return '#f5e042';
        if (status == 'acepta') return 'green';
        if (status == 'facturado') return 'teal';

        return 'black';
    }

    const inicializarPresupuesto = () => {
        const presupuesto = new PresupuestoModel(presupuestoSF)
        loadPresupuesto(presupuesto)
        navigation.navigate('Formulario')
    }


    return (
        <>
            <TouchableOpacity style={{
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
                <Text numberOfLines={1} style={{ flex: 2 }} >{nombre}</Text>
                <Text style={{ flex: 1, textAlign: 'right' }}>ID {presupuestoSF.abono.presup_id}</Text>
            </TouchableOpacity>

            <ModalLayout isVisible={show} setIsVisible={setShow}>
                <ModalLayout.Content>
                    <ColumnBetween>
                        <Column>
                            <RowBetween>
                                <Text style={{ fontSize: 24, marginBottom: 20, }}>
                                    {nombre}
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

                        <Button style={{ marginTop: 20 }} title='Ver' onPress={inicializarPresupuesto} />
                        <Button style={{ marginTop: 20, backgroundColor: 'grey' }} title='Cerrar' onPress={() => setShow(false)} />
                    </ColumnBetween>

                </ModalLayout.Content>
            </ModalLayout>

        </>

    )
}
