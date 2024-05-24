import { useContext, useState } from "react"
import { Text, View } from "react-native"
import { Divider } from "@rneui/themed"
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Column, Button, ShadowView, Layout } from "../components/ui"
import { CustomAgendaItem } from "../components/agenda/CustomAgendaItem"
import { getHumanDate } from "../utils"

import { AgendaContext } from "../contexts"
import { useRefresh } from "../hooks/useRefresh";
import { useValidateSession } from "../hooks/useValidateSession";

const Agenda = () => {
    const { agenda = [] } = useContext(AgendaContext)
    const [date, setDate] = useState(new Date());

    const todayAgenda = agenda?.filter(item => {
        const itemDate = new Date(item.start)
        return itemDate.getDate() === date.getDate() && itemDate.getMonth() === date.getMonth()
    })


    const onChange = (_, newDate) => setDate(newDate)

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
            minimumDate: new Date(date.getFullYear(), date.getMonth(), 1),
            maximumDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const [ValidateSessionModal, setModalVisible] = useValidateSession()
    const [Control] = useRefresh(() => setModalVisible(true))

    return (
        <>
            <ValidateSessionModal />

            <Layout refreshControl={<Control />}>
                <ShadowView>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                        padding: 20,
                    }}>
                        <Text>Fecha</Text>

                        <Button
                            onPress={() => showDatepicker()}
                            title={getHumanDate(date)}
                        />
                    </View>
                </ShadowView>

                <Divider />

                {todayAgenda.length > 0 ? (
                    <>
                        <ShadowView>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '100%',
                                alignItems: 'center',
                                padding: 20,
                            }}>
                                <Text style={{ flex: 3, fontWeight: '600' }}>Nombre</Text>
                                <Text style={{ flex: 2, fontWeight: '600' }}>Fecha</Text>
                            </View>
                        </ShadowView>

                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ textAlign: 'center', display: todayAgenda.length ? 'none' : 'flex' }}>No hay eventos para este día</Text>
                        </View>

                        <Column style={{ gap: 10 }}>
                            {todayAgenda.map((item, index) => <CustomAgendaItem data={item} key={index} />)}
                        </Column>
                    </>
                ) : (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <Text style={{ textAlign: 'center', fontSize: 18 }}>No hay eventos para este día</Text>
                    </View>
                )}


            </Layout >
        </>
    )
}

export default Agenda