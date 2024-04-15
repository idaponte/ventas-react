import { View, Text, TextInput, ScrollView } from 'react-native'
import { Layout } from '../../components/ui/Layout'
import { globalStyles } from '../../styles/globals'
import { Input } from '../../components/Input'
import { Dropdown } from '../../components/Dropdown'

const AbonoForm = () => {

    const mockData = [
        { key: '1', label: 'Abono 1' },
        { key: '2', label: 'Abono 2' },
        { key: '3', label: 'Abono 3' },
        { key: '4', label: 'Abono 4' },
        { key: '5', label: 'Abono 5' },
    ]

    return (
        <Layout>
            <View style={{ display: 'flex', gap: 20 }}>

                <Dropdown label='Tipo de abno' data={mockData} />
                <Dropdown label='Tipo de instalación' data={mockData} />
                <Input label='Bonif. instalación' />
                <Dropdown label='Bonificación de abono' data={mockData} />
                <Dropdown label='Meses de bonificación' data={mockData} />
                <Dropdown label='Tipo de pago' data={mockData} />
                <Input label='Detalle forma de pago' />
                <Input label='Observaciones internas' multiline numberOfLines={4} />
                <Input label='Observaciones para el cliente' multiline numberOfLines={4} />

            </View>
        </Layout >
    )
}

export default AbonoForm