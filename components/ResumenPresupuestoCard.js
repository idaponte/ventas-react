import { StyleSheet, Text, View } from "react-native"
import { globalStyles } from "../styles/globals"
import { Divider } from "@rneui/themed"

export const ResumenPresupuestoCard = ({
    title,
    dolar,
    totalEquipos,
    totalEquiposUSD,
    totalInsta,
    totalPresupuesto,
    esContado,
    totalContado,
    totalInstaBonif,
    cantMeses,
    valorCuota
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
                <View style={styles.listItem}>
                    <Text style={{ fontSize: 16 }}>Equipos (US$ {totalEquiposUSD})</Text>
                    <Text style={globalStyles.price}>{totalEquipos}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ fontSize: 16 }}>Instalación</Text>
                    <Text style={globalStyles.price}>{totalInsta}</Text>
                </View>
                <View style={{ ...styles.listItem, display: totalInsta === totalInstaBonif ? 'none' : 'flex' }}>
                    <Text style={{ fontSize: 16 }}>Instalación bonif.</Text>
                    <Text style={globalStyles.price}>{totalInstaBonif}</Text>
                </View>
                <View style={{ ...styles.listItem, display: esContado ? 'flex' : 'none' }}>
                    <Text style={{ fontSize: 16 }}>Contado (10%)</Text>
                    <Text style={globalStyles.price}>{totalContado}</Text>
                </View>
                <View style={styles.listItem}>
                    <Text style={{ fontSize: 16 }}>Total presupuesto</Text>
                    <Text style={globalStyles.price}>{totalPresupuesto}</Text>
                </View>
                <View style={{ ...styles.listItem, display: cantMeses ? 'flex' : 'none' }}>
                    <Text style={{ fontSize: 16 }}>{cantMeses} cuotas de</Text>
                    <Text style={globalStyles.price}>{valorCuota}</Text>
                </View>
            </View>
        </View>
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
    },
    listItem: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
})