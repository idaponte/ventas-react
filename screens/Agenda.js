import { useContext, useState } from "react"
import { Text, View } from "react-native"
import { Divider } from "@rneui/themed"
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Column, Button, ShadowView, Layout } from "../components/ui"
import { CustomAgendaItem } from "../components/agenda/CustomAgendaItem"
import { getHumanDate } from "../utils/getHumanDate"

import { AgendaContext } from "../contexts"
import { useRefresh } from "../hooks/useRefresh";
import { useValidateSession } from "../hooks/useValidateSession";

const Agenda = () => {
    const { agenda } = useContext(AgendaContext)

    const [date, setDate] = useState(new Date(1598051730000));

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
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

                <Column style={{ gap: 10 }}>
                    {agenda.map((item, index) => <CustomAgendaItem data={item} key={index} />)}
                </Column>
            </Layout>


            {/* <DatePicker
                modal
                open={open}
                date={date}
                onConfirm={(date) => {
                    setOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            /> */}
        </>
    )
}

export default Agenda