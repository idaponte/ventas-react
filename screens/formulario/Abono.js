import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Dropdown, Input, Layout } from '../../components/ui'
import { DataContext } from '../../contexts/DataProvider'
import { PresupContext } from '../../contexts/PresupProvider'

const AbonoForm = () => {

    const {
        tipoinstalaciones,
        meses,
        bonifs,
    } = useContext(DataContext)

    const {
        presupuesto,
        setPresupuesto
    } = useContext(PresupContext)


    const [bonificacion, setBonificacion] = useState([])
    const [tipoAbono, setTipoAbono] = useState([])
    const [mesesBonif, setMesesBonif] = useState([])

    const tipoInstalacion = [
        { label: 'Insta. común', value: 'Insta. común' },
        { label: 'Reseteo', value: 'Reseteo' },
        { label: 'Traslado', value: 'Traslado' },
    ]



    const tipoPago = [
        { label: 'otra', value: 'otra' },
        { label: 'contado', value: 'contado' },
        { label: '3 cuotas', value: '3_cuotas' },
        { label: '6 cuotas', value: '6_cuotas' },
        { label: 'contado sin descuentos', value: 'contado_sin_descuentos' },
    ]

    useEffect(() => {
        if (bonifs.length === 0) return
        if (meses.length === 0) return
        if (tipoinstalaciones.length === 0) return

        setTipoAbono(
            tipoinstalaciones.map(tipo => {
                return {
                    label: `${tipo.name} (\$${tipo.abono})`,
                    value: tipo.insta_id
                }
            })
        )

        setBonificacion(bonifs.filter(bonif => bonif.discount === '0.15').map(bonif => {
            return {
                label: bonif.name,
                value: bonif.discount
            }
        }))

        setMesesBonif(meses.map(mes => {
            return {
                label: `${mes.cant} meses`,
                value: mes.cant
            }
        }))


    }, [meses, bonifs, tipoinstalaciones])

    useEffect(() => {
        if (bonificacion.length === 0) return
        if (mesesBonif.length === 0) return


        setPresupuesto({
            ...presupuesto,
            oper: {
                ...presupuesto.oper,
                categoria: tipoInstalacion[0].value,
                tipoPago: tipoPago[0].value
            },
            abono: {
                ...presupuesto.abono,
                bonifAbono: bonificacion[0].value,
                bonifMeses: mesesBonif[0].value
            }
        })

    }, [bonificacion, mesesBonif])


    const getBonifLabel = (value = '') => {
        if (bonificacion.length === 0 || value === '') return ''
        return bonificacion.find(bonif => bonif.value === value).label
    }

    const getMesesLabel = (value = '') => {
        if (mesesBonif.length === 0 || value === '') return ''
        return mesesBonif.find(mes => mes.value === value).label
    }

    const updateAbono = (key, value) => {
        setPresupuesto({
            ...presupuesto,
            abono: {
                ...presupuesto.abono,
                [key]: value
            }
        })
    }

    const updateOper = (key, value) => {
        setPresupuesto({
            ...presupuesto,
            oper: {
                ...presupuesto.oper,
                [key]: value
            }
        })
    }

    const getTipoPagoLabel = tipoPago.find(tipo => tipo.value === presupuesto.oper.tipoPago)?.label || ''


    const setBonifInstalacion = (value) => {
        // TODO: validar que no sea mayor a 100, ni negativo

        const valueNbr = Number(value)

        if (isNaN(valueNbr)) {
            return
        }

        setPresupuesto({
            ...presupuesto,
            abono: {
                ...presupuesto.abono,
                bonifpPercAux: valueNbr
            }
        })

    }

    return (
        <Layout>
            <View style={{ display: 'flex', gap: 20 }}>

                <Dropdown label='Tipo de abono' data={tipoAbono} />
                <Dropdown label='Tipo de instalación' value={presupuesto.oper.categoria} data={tipoInstalacion} />
                <Input keyboardType='numeric' onChange={setBonifInstalacion} value={presupuesto.abono.bonifpPercAux?.toString() || ''} label='Bonif. instalación (%)' />
                <Dropdown label='Bonificación de abono' onChange={(item) => updateAbono('bonifAbono', item.value)} value={getBonifLabel(presupuesto.abono.bonifAbono)} data={bonificacion} />
                <Dropdown label='Meses de bonificación' onChange={(item) => updateAbono('bonifMeses', item.value)} value={getMesesLabel(presupuesto.abono.bonifMeses)} data={mesesBonif} />
                <Dropdown label='Tipo de pago' onChange={(item) => updateOper('tipoPago', item.value)} value={getTipoPagoLabel} data={tipoPago} />
                <Input label='Detalle forma de pago' onChange={(value) => updateOper('formapago', value)} value={presupuesto.oper.formapago} />
                <Input label='Observaciones internas' onChange={(value) => updateOper('intobserv', value)} value={presupuesto.oper.intobserv} multiline numberOfLines={4} />
                <Input label='Observaciones para el cliente' onChange={(value) => updateOper('observ', value)} value={presupuesto.oper.observ} multiline numberOfLines={4} />

            </View>
        </Layout >
    )
}

export default AbonoForm