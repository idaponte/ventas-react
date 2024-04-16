import { Text, TouchableOpacity, View } from "react-native"
import { Layout } from "../components/ui/Layout"
import { ShadowView } from "../components/ui/ShadowView"
import { Button } from "../components/ui/Button"
import DatePicker from "react-native-date-picker"
import { useState } from "react"
import { Divider } from "@rneui/themed"
import { CustomAgendaItem } from "../components/agenda/CustomAgendaItem"


const Agenda = () => {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState(new Date())

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
                            onPress={() => setOpen(true)}
                            title={date.toDateString()}
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

                <CustomAgendaItem nombre="Ignacio da Ponte" fecha="12/12/2021" hora="10:00" />
            </Layout>


            <DatePicker
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
            />
        </>
    )
}

export default Agenda