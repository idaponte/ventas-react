import { useContext } from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Layout, Button } from '../../components/ui/Button'
import { globalColors } from '../../styles/globals'
import { presupValidator } from '../../validators/presupValidator'
import { DataContext, PresupuestoServiceContext, PresupContext } from '../../contexts'
import { formatPrice } from '../../utils/currencyFormatter'
import { showToast } from '../../utils/showToast'
import { ResumenPresupuestoCard } from '../../components/ResumenPresupuestoCard'



const ResumenPresupuesto = () => {
    const presupCtx = useContext(PresupContext)
    const dataCtx = useContext(DataContext)

    const { storePresupuesto } = useContext(PresupuestoServiceContext)

    const navigation = useNavigation()

    const { dolarCotiz, toPesos, dolar } = dataCtx
    const { totales, cuotas, isPresupEditable, resetPresupuesto } = presupCtx

    const esContado = presupCtx.presupuesto.oper.tipo_pago === 'contado'

    const handleClose = () => {
        resetPresupuesto()
        navigation.navigate('Presupuestos')
    }

    const handleGuardar = async () => {
        try {
            let errors = presupValidator({ presupCtx })

            if (errors.length) {
                errors = errors.map((error, index) => `${index + 1}. ${error}`)
                Alert.alert('Errores', errors.join('\n\n'))
                return
            }

            const finalPresup = presupCtx.getPresupToPost()
            const exito = await storePresupuesto(finalPresup)

            if (exito) {
                showToast('Presupuesto guardado correctamente')
                navigation.navigate('Presupuestos')
            }
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <Layout>
            <View style={{ display: 'flex', gap: 15, justifyContent: 'center', }}>

                <ResumenPresupuestoCard
                    title='Presupuesto aceptado'
                    dolar={dolarCotiz}
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
                    dolar={dolarCotiz}
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

                <View style={styles.buttonContainer}>

                    {
                        isPresupEditable
                            ? (
                                <>
                                    <Button title='Limpiar' style={styles.button} onPress={() => { }} />
                                    <Button title='Guardar' style={styles.button} onPress={handleGuardar} color={globalColors.success[600]} underlayColor={globalColors.success[800]} />
                                </>
                            )
                            : (
                                <Button title='Cerrar' style={styles.button} onPress={handleClose} />
                            )
                    }
                </View>
            </View>
        </Layout>
    )
}



export default ResumenPresupuesto


const styles = StyleSheet.create({
    button: { flex: 1, paddingVertical: 15 },
    buttonContainer: { display: 'flex', gap: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' },
})