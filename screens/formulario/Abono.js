import { View, Text, TextInput, ScrollView } from 'react-native'
import { Layout } from '../../components/ui/Layout'
import { globalStyles } from '../../styles/globals'
import { Input } from '../../components/Input'
import { Dropdown } from '../../components/Dropdown'
import { useContext } from 'react'
import { DataContext } from '../../contexts/DataProvider'

const AbonoForm = () => {

    const {
        tipoinstalaciones,
        meses,
        bonifs,
    } = useContext(DataContext)

    const mockData = []


    const tipoAbono = tipoinstalaciones.map(tipo => {
        return {
            label: `${tipo.name} (\$${tipo.abono})`,
            value: tipo.insta_id
        }
    })

    const tipoInstalacion = [
        { label: 'Insta. común', value: 'Insta. común' },
        { label: 'Reseteo', value: 'Reseteo' },
        { label: 'Traslado', value: 'Traslado' },
    ]

    const bonificacion = bonifs.filter(bonif => bonif.discount === '0.15').map(bonif => {
        return {
            label: bonif.name,
            value: bonif.discount
        }
    })

    const mesesBonif = meses.map(mes => {
        return {
            label: `${mes.cant} meses`,
            value: mes.cant
        }
    })

    /*
          TipoPago(id: 'otra', nombre: 'otra'),
      TipoPago(id: 'contado', nombre: 'contado'),
      TipoPago(id: '3_cuotas', nombre: '3 cuotas'),
      TipoPago(id: '6_cuotas', nombre: '6 cuotas'),
      TipoPago(id: 'contado_sin_descuentos', nombre: 'contado sin descuentos'),
    */

    const tipoPago = [
        { label: 'otra', value: 'otra' },
        { label: 'contado', value: 'contado' },
        { label: '3 cuotas', value: '3_cuotas' },
        { label: '6 cuotas', value: '6_cuotas' },
        { label: 'contado sin descuentos', value: 'contado_sin_descuentos' },
    ]


    return (
        <Layout>
            <View style={{ display: 'flex', gap: 20 }}>

                <Dropdown label='Tipo de abno' data={tipoAbono} />
                <Dropdown label='Tipo de instalación' data={tipoInstalacion} />
                <Input label='Bonif. instalación' />
                <Dropdown label='Bonificación de abono' data={bonificacion} />
                <Dropdown label='Meses de bonificación' data={mesesBonif} />
                <Dropdown label='Tipo de pago' data={tipoPago} />
                <Input label='Detalle forma de pago' />
                <Input label='Observaciones internas' multiline numberOfLines={4} />
                <Input label='Observaciones para el cliente' multiline numberOfLines={4} />

            </View>
        </Layout >
    )
}

export default AbonoForm