import { useContext, useEffect, useState } from 'react'
import { View } from 'react-native'
import { Dropdown, Input, Layout } from '../../components/ui'
import { DataContext } from '../../contexts/DataProvider'
import { PresupContext } from '../../contexts/PresupProvider'
import { showToast } from '../../utils/showToast'

const AbonoForm = () => {

    const {
        tipoInstalacion,
        tipoPago,
        tipoAbono,
        meses,
        bonifs,
        preciosById,
        esAbonoInalambrico,
        getTipoAbonoById,
    } = useContext(DataContext)

    const {
        presupuesto,
        setPresupuesto,
        hasPresupComunicador,
        resetPrecioComunicador,
    } = useContext(PresupContext)

    const getTipoAbonoLabel = (value = '') => {
        if (tipoAbono.length === 0 || value === '') return ''
        const tipoAbonoItem = tipoAbono.find(tipo => tipo.value === value)
        if (!tipoAbonoItem) return ''
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

    const getTipoPagoLabel = tipoPago.find(tipo => tipo.value === presupuesto.oper.tipoPago)?.label || ''


    const setBonifInstalacion = (value) => {
        // TODO: validar que no sea mayor a 100, ni negativo
        console.log(value)

        const valueNbr = Number(value)

        if (isNaN(valueNbr)) {
            return
        }

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            abono: {
                ...oldPresup.abono,
                bonifpPercAux: valueNbr
            }
        }))

    }

    const setTipoAbono = (item) => {
        const isPrevTipoAbonoInalambrico = esAbonoInalambrico(presupuesto.oper.insta_id)
        const isNewTipoAbonoInalambrico = esAbonoInalambrico(item.value)
        const isNewTipoAbonoMant = getTipoAbonoById(item.value).label.toLowerCase().includes('mant.')
        const comm = hasPresupComunicador()

        console.log({
            isPrevTipoAbonoInalambrico,
            isNewTipoAbonoInalambrico,
            isNewTipoAbonoMant,
            comm

        })

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
            const comunicador = preciosById[24]
            if (!comunicador) return
            resetPrecioComunicador(comunicador.precio);
        }

        updateOper('insta_id', item.value)
    }

    useEffect(() => {
        console.log('tipoAbono', presupuesto.oper.insta_id)
    }, [presupuesto.oper.insta_id])


    return (
        <Layout>
            <View style={{ display: 'flex', gap: 20 }}>

                <Dropdown label='Tipo de abono' value={getTipoAbonoLabel(presupuesto.oper.insta_id)} onChange={setTipoAbono} data={tipoAbono} />
                <Dropdown label='Tipo de instalación' value={presupuesto.oper.categoria} onChange={(item) => updateOper('categoria', item.value)} data={tipoInstalacion} />
                <Input keyboardType='numeric' onChange={setBonifInstalacion} value={presupuesto.abono.bonifpPercAux?.toString() || ''} label='Bonif. instalación (%)' />
                <Dropdown label='Bonificación de abono' onChange={(item) => updateAbono('bonifAbono', item.value)} value={getBonifLabel(presupuesto.abono.bonifAbono)} data={bonifs} />
                <Dropdown label='Meses de bonificación' onChange={(item) => updateAbono('bonifMeses', item.value)} value={getMesesLabel(presupuesto.abono.bonifMeses)} data={meses} />
                <Dropdown label='Tipo de pago' onChange={(item) => updateOper('tipoPago', item.value)} value={getTipoPagoLabel} data={tipoPago} />
                <Input label='Detalle forma de pago' onChange={(value) => updateOper('formapago', value)} value={presupuesto.oper.formapago} />
                <Input label='Observaciones internas' onChange={(value) => updateOper('intobserv', value)} value={presupuesto.oper.intobserv} multiline numberOfLines={4} />
                <Input label='Observaciones para el cliente' onChange={(value) => updateOper('observ', value)} value={presupuesto.oper.observ} multiline numberOfLines={4} />

            </View>
        </Layout >
    )
}

export default AbonoForm