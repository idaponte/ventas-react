import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Layout } from '../../components/ui/Layout'
import { globalColors, globalStyles } from '../../styles/globals'
import { Divider } from '@rneui/base'

const ResumenPresupuestoCard = ({
    title,
    dolar,
    equipos,
    equiposUSD,
    instalacion,
    total
}) => {
    return (
        <View style={styles.resumenPresupuestoCard}>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 25 }}>
                    {title}
                </Text>
                <Text style={{ fontSize: 18 }}>Dolar: ${dolar}</Text>
            </View>

            <Divider />

            <View style={{ display: 'flex', gap: 10 }}>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Equipos (US$ {equiposUSD})</Text>
                    <Text style={globalStyles.price}>${equipos}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Instalación</Text>
                    <Text style={globalStyles.price}>${instalacion}</Text>
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 16 }}>Total presupuesto</Text>
                    <Text style={globalStyles.price}>${total}</Text>
                </View>
            </View>
        </View>
    )
}

const ResumenPresupuesto = () => {
    return (
        <Layout>
            <View style={{ display: 'flex', gap: 15, justifyContent: 'center' }}>

                <ResumenPresupuestoCard
                    title='Presupuesto aceptado'
                    dolar='884'
                    equipos='0.00'
                    equiposUSD='0.00'
                    instalacion='0.00'
                    total='0.00'
                />

                <ResumenPresupuestoCard
                    title='Presupuesto sugerido'
                    dolar='884'
                    equipos='0.20'
                    equiposUSD='0.00'
                    instalacion='0.00'
                    total='0.00'
                />


                <View style={{ display: 'flex', gap: 20, flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center' }}>

                    <TouchableOpacity style={{ backgroundColor: globalColors.danger, flex: 1, borderRadius: 50, padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Limpiar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ backgroundColor: globalColors.success, flex: 1, borderRadius: 50, padding: 20, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Guardar</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </Layout>
    )
}

const styles = StyleSheet.create({
    resumenPresupuestoCard: {
        padding: 20,
        elevation: 5,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        backgroundColor: 'white',
        gap: 25
    }
}
)

export default ResumenPresupuesto