import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Layout } from '../../components/ui/Layout'
import { globalColors } from '../../styles/globals'
import { useContext } from 'react'
import { DataContext } from '../../contexts/DataProvider'
import { presupValidator } from '../../validators/presupValidator'
import { PresupContext } from '../../contexts/PresupProvider'
import { formatPrice } from '../../utils/currencyFormatter'
import { showToast } from '../../utils/showToast'
import { ResumenPresupuestoCard } from '../../components/ResumenPresupuestoCard'



const ResumenPresupuesto = () => {
    const presupCtx = useContext(PresupContext)
    const dataCtx = useContext(DataContext)
    const { dolar, toPesos } = dataCtx
    const { totales, cuotas } = presupCtx

    const esContado = presupCtx.presupuesto.oper.tipo_pago === 'contado'

    const handleGuardar = () => {
        let errors = presupValidator({
            presupCtx,
            dataCtx
        })

        if (errors.length) {
            errors = errors.map((error, index) => `${index + 1}. ${error}`)
            Alert.alert('Errores', errors.join('\n\n'))
            return
        }

        showToast('Presupuesto guardado correctamente')
        // TODO: cargar presupuesto
    }


    return (
        <Layout>
            <View style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>

                <ResumenPresupuestoCard
                    title='Presupuesto aceptado'
                    dolar={Number(dolar.cotiz).toFixed(0)}
                    totalEquipos={formatPrice(toPesos(totales.totalEquiposAceptado))}
                    totalEquiposUSD={totales.totalEquiposAceptado}
                    totalInsta={formatPrice(totales.totalInstaAceptado)}
                    totalPresupuesto={formatPrice(totales.totalPresupuestoAceptado)}
                    esContado={esContado}
                    totalContado={formatPrice(totales.totalContadoAceptado)}
                    totalInstaBonif={formatPrice(totales.totalInstaBonifAceptado)}
                    cantMeses={cuotas.cantMeses}
                    valorCuota={formatPrice(cuotas.valorCuotaAceptado)}
                />

                <ResumenPresupuestoCard
                    title='Presupuesto sugerido'
                    dolar={Number(dolar.cotiz).toFixed(0)}
                    totalEquipos={formatPrice(toPesos(totales.totalEquiposSugerido))}
                    totalEquiposUSD={totales.totalEquiposSugerido}
                    totalInsta={formatPrice(totales.totalInstaSugerido)}
                    totalPresupuesto={formatPrice(totales.totalPresupuestoSugerido)}
                    esContado={esContado}
                    totalContado={formatPrice(totales.totalContadoSugerido)}
                    totalInstaBonif={formatPrice(totales.totalInstaBonifSugerido)}
                    cantMeses={cuotas.cantMeses}
                    valorCuota={formatPrice(cuotas.valorCuotaSugerido)}
                />

                <View style={{ display: 'flex', gap: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity style={{ backgroundColor: globalColors.danger, flex: 1, borderRadius: 50, padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Limpiar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: globalColors.success, flex: 1, borderRadius: 50, padding: 20, alignItems: 'center' }} onPress={handleGuardar}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Guardar</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </Layout>
    )
}



export default ResumenPresupuesto