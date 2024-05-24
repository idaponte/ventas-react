import { useContext, useState } from "react";
import { Text, View, StyleSheet } from "react-native"
import { CustomListHeader } from "./CustomListHeader"
import { CustomListItem } from "./CustomListItem"
import { Divider } from "@rneui/base";
import { ItemDetailsModal } from "../modals/ItemDetailsModal";
import { PresupContext } from "../../contexts";
import { formatPrice } from "../../utils/currencyFormatter";




export const ItemsList = () => {
    const { presupuesto, totalPrecioMateriales, totales } = useContext(PresupContext)

    const [modal1Visible, setIsVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null)




    return (
        <>
            <View style={{ gap: 10, marginBottom: 20 }}>

                <CustomListHeader />

                {
                    Object.values(presupuesto.items).map((item) => (
                        <CustomListItem key={item.generic_id} item={item} onPress={() => {
                            setSelectedItem(item.generic_id)
                            setIsVisible(true)
                        }} />
                    ))
                }

                <View style={{
                    ...styles.footerListItem, backgroundColor: '#c7c7c7'
                }}>
                    <Text>Materiales</Text>
                    <Text>{formatPrice(totales.totalMaterialesAceptado)}</Text>
                </View>


                <Divider />

                <View style={styles.footerListItem}>
                    <Text>Subtotal</Text>
                    <Text>{formatPrice(totales.totalEquiposAceptado)}</Text>
                </View>

                <View style={styles.footerListItem}>
                    <Text>Subtotal Insta.</Text>
                    <Text>{formatPrice(totales.totalInstaAceptado)}</Text>
                </View>
            </View>


            <ItemDetailsModal itemId={selectedItem} isVisible={modal1Visible} setIsVisible={setIsVisible} />
        </>
    )
}

const styles = StyleSheet.create({
    footerListItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#a8a8a8',
        padding: 15,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    modalContent: {
        backgroundColor: 'white',
        height: '70%',
        width: '85%',
        borderRadius: 20,
        padding: 20,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
})