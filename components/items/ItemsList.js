import { useState } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native"
import { CustomListHeader } from "./CustomListHeader"
import { CustomListItem } from "./CustomListItem"
import { Divider } from "@rneui/base";
import { ItemDetailsModal } from "../modals/ItemDetailsModal";




export const ItemsList = () => {
    const [modal1Visible, setIsVisible] = useState(false);

    const list = [
        { title: 'List Item 1' },
        { title: 'List Item 2' },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    const [cant, setCant] = useState({
        sugerido: 0,
        aceptado: 0
    });

    return (
        <>
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                flex: 1,
                marginBottom: 20,
            }}>

                <CustomListHeader />


                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => setIsVisible(!modal1Visible)} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => setIsVisible(!modal1Visible)} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => setIsVisible(!modal1Visible)} />

                <View style={{
                    ...styles.footerListItem, backgroundColor: '#c7c7c7'
                }}>
                    <Text>Materiales</Text>
                    <Text>$ 0.0</Text>
                </View>


                <Divider />

                <View style={styles.footerListItem}>
                    <Text>Subtotal</Text>
                    <Text>US$ 0.0</Text>
                </View>

                <View style={styles.footerListItem}>
                    <Text>Subtotal Insta.</Text>
                    <Text>AR$ 0.0</Text>
                </View>
            </View>


            <ItemDetailsModal isVisible={modal1Visible} setIsVisible={setIsVisible} />
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