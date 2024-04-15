
import { Modal, ScrollView, Text, View, StyleSheet, TextInput, FlatList, TouchableOpacity } from "react-native"
import { Button, Divider } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalColors } from "../../styles/globals";
import { ModalLayout } from "./ModalLayout";

export const SearchResultsModal = ({ isVisible, setIsVisible }) => {

    const data = [
        { key: 'Devin' },
        { key: 'Dan' },
        { key: 'Dominic' },
        { key: 'Jackson' },
        { key: 'James' },
        { key: 'Joel' },
        { key: 'John' },
        { key: 'Jillian' },
        { key: 'Jimmy' },
        { key: 'Julie' },

    ]

    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={styles.modalContent}>
                {
                    data.length
                        ? (<FlatList
                            data={data}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity onPress={() => setIsVisible(false)}>
                                    <Text style={{
                                        ...styles.item,
                                        backgroundColor: index % 2 == 0 ? '#f3f3f3' : '#fff'

                                    }}>{item.key}</Text>
                                </TouchableOpacity>
                            )}
                        />)
                        : (
                            <View style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Icon name="search" size={20} />
                                <Text style={{ fontSize: 20, fontWeight: '600' }}>No hay resultados</Text>
                            </View>
                        )
                }

            </View>

        </ModalLayout>
    )
}






const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
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