import { useContext, useEffect, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { Layout } from "../components/ui/Layout"
import { ShadowView } from "../components/ui/ShadowView"
import { Button } from "../components/ui/Button"
import { Divider } from "@rneui/themed"
import { CustomAgendaItem } from "../components/agenda/CustomAgendaItem"
import { getHumanDate } from "../utils/getHumanDate"

import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Fetch } from "../services/fetch"
import { AgendaContext } from "../contexts/AgendaService"
import { Column } from "../components/ui"

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


    return (
        <>
            <Layout>
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