import { useContext } from 'react'
import { View } from 'react-native'
import { Dropdown, Input, Layout } from '../../components/ui'
import { PresupContext, DataContext } from '../../contexts'
import { showToast } from '../../utils'

const AbonoForm = () => {

    const {
        tipoInstalacion,
        tipoPago,
        tipoAbono,
        meses,
        bonifs,
        getItemById,
        esAbonoInalambrico,
        getTipoAbonoById,
    } = useContext(DataContext)

    const {
        presupuesto,
        abonoInalambrico,
        isPresupEditable,
        setPresupuesto,
        hasPresupComunicador,
        resetPrecioComunicador,
    } = useContext(PresupContext)

    const tipoAbonoAdapted = Object.values(tipoAbono).map(item => ({
        ...item,
        label: `${item.label} - ($${item.precio})`
    }))

    const getTipoAbonoLabel = (insta_id = '') => {
        const tipoAbonoItem = getTipoAbonoById(insta_id)
        return `${tipoAbonoItem.label} - ($${tipoAbonoItem.precio})`
    }

    const getBonifLabel = (value = '') => {
        if (bonifs.length === 0 || value === '') return ''
        return bonifs.find(bonif => bonif.value === value)?.label || ''
    }

    const getMesesLabel = (value = '') => {
        if (meses.length === 0 || value === '') return ''
        return meses.find(mes => mes.value === value)?.label || ''
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
        setPresupuesto(oldPresup => ({
            ...oldPresup,
            oper: {
                ...oldPresup.oper,
                [key]: value
            }
        }))
    }

    const getTipoPagoLabel = tipoPago.find(tipo => tipo.value === presupuesto.oper.tipo_pago)?.label || ''


    const setBonifInstalacion = (value) => {
        // TODO: validar que no sea mayor a 100, ni negativo
        const valueNbr = Number(value)

        if (!isNaN(valueNbr)) {
            setPresupuesto(oldPresup => ({
                ...oldPresup,
                abono: {
                    ...oldPresup.abono,
                    bonifpPercAux: valueNbr,
                    bonifpPerc: valueNbr / 100
                }
            }))
        }



    }

    const setTipoAbono = (item) => {
        const isPrevTipoAbonoInalambrico = abonoInalambrico
        const isNewTipoAbonoInalambrico = esAbonoInalambrico(item.value)
        const isNewTipoAbonoMant = getTipoAbonoById(item.value).label.includes('mant.')
        const comm = hasPresupComunicador()

        // console.log({
        //     isPrevTipoAbonoInalambrico,
        //     isNewTipoAbonoInalambrico,
        //     isNewTipoAbonoMant,
        //     comm
        // })

        if (!comm) {
            showToast('No se ha seleccionado un comunicador')
            return
        }

        if (!isNewTipoAbonoInalambrico && isPrevTipoAbonoInalambrico) {
            if (comm.qty > 0) {
                showToast('Debe dejar la cantidad de Comunicador Inalámbrico en 0.')
                return
            }
        }

        if (isNewTipoAbonoMant) {
            resetPrecioComunicador();
        }

        if (!isNewTipoAbonoInalambrico && comm.qty > 0) {
            showToast('Debe dejar la cantidad de Comunicador Inalámbrico en 0.')
            return;
        }

        if (!isNewTipoAbonoMant) {
            const comunicador = getItemById(24)
            if (!comunicador) return
            resetPrecioComunicador(comunicador.precio);
        }

        updateOper('insta_id', item.value)
        updateAbono('abono', item.precio)
    }

    return (
        <Layout>
            <View style={{ display: 'flex', gap: 20 }}>

                <Dropdown editable={isPresupEditable} label='Tipo de abono' value={getTipoAbonoLabel(presupuesto.oper.insta_id)} onChange={setTipoAbono} data={tipoAbonoAdapted} />
                <Dropdown editable={isPresupEditable} label='Tipo de instalación' value={presupuesto.oper.categoria} onChange={(item) => updateOper('categoria', item.value)} data={tipoInstalacion} />
                <Input editable={isPresupEditable} keyboardType='numeric' onChange={setBonifInstalacion} value={presupuesto.abono.bonifpPercAux?.toString() || ''} label='Bonif. instalación (%)' />
                <Dropdown editable={isPresupEditable} label='Bonificación de abono' onChange={(item) => updateAbono('bonif_abono', item.value)} value={getBonifLabel(presupuesto.abono.bonif_abono)} data={bonifs} />
                <Dropdown editable={isPresupEditable} label='Meses de bonificación' onChange={(item) => updateAbono('bonif_meses', item.value)} value={getMesesLabel(presupuesto.abono.bonif_meses)} data={meses} />
                <Dropdown editable={isPresupEditable} label='Tipo de pago' onChange={(item) => updateOper('tipo_pago', item.value)} value={getTipoPagoLabel} data={tipoPago} />
                <Input editable={isPresupEditable} label='Detalle forma de pago' onChange={(value) => updateOper('formapago', value)} value={presupuesto.oper.formapago} />

                <Input editable={isPresupEditable && isNaN(Number(presupuesto.oper.presup_id))} label='Observaciones internas' onChange={(value) => updateOper('intobserv', value)} value={presupuesto.oper.intobserv} multiline numberOfLines={4} />
                {!isNaN(Number(presupuesto.oper.presup_id)) && <Input editable={isPresupEditable && !isNaN(Number(presupuesto.oper.presup_id))} label='Añadir obs. interna' onChange={(value) => updateOper('intobserv_new', value)} value={presupuesto.oper.intobserv_new} multiline numberOfLines={2} />}

                <Input editable={isPresupEditable} label='Observaciones para el cliente' onChange={(value) => updateOper('observ', value)} value={presupuesto.oper.observ} multiline numberOfLines={4} />

            </View>
        </Layout >
    )
}

export default AbonoForm