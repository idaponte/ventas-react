import { Modal, ScrollView, Text, View, StyleSheet, TextInput } from "react-native"
import { Button, Divider } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalColors } from "../../styles/globals";
import { useState } from "react";
import { ModalLayout } from "./ModalLayout";

const Counter = ({ title, cant, setCant, base = 0 }) => {

    const handleCant = (cant) => {
        if (cant < base) return;
        setCant(cant);
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 18 }}>{title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button color='lightgrey' size='md' onPress={() => handleCant(cant - 1)}><Icon name="minus" /></Button>
                <Text style={{ marginHorizontal: 20, fontSize: 18 }} >{cant}</Text>
                <Button color='lightgrey' size='md' onPress={() => handleCant(cant + 1)}><Icon name="plus" /></Button>
            </View>
        </View>
    )
}

export const ItemDetailsModal = ({ isVisible, setIsVisible }) => {
    const [cant, setCant] = useState({
        sugerido: 0,
        aceptado: 0
    });


    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={styles.modalContent}>
                <ScrollView>

                    <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>Comunicador inalámbrico (24)</Text>
                        <Button color={globalColors.danger} size='sm' onPress={() => setIsVisible(!isVisible)}><Icon color='white' name="trash" /></Button>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Counter
                            title='Sugerido'
                            cant={cant.sugerido}
                            setCant={cant => setCant({ ...cant, sugerido: cant })}
                        />

                        <Counter
                            title='Aceptado'
                            cant={cant.aceptado}
                            setCant={cant => setCant({ ...cant, aceptado: cant })}
                        />
                    </View>

                    <View style={{ display: 'flex', }}>
                        <Text style={{ fontSize: 18, marginBottom: 5 }}>Comentarios</Text>
                        <TextInput numberOfLines={3} style={{ width: '100%', borderRadius: 7, paddingHorizontal: 10, borderWidth: 1, borderColor: '#a8a8a8' }} />
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <Text style={{ fontSize: 18 }}>Precio</Text>
                        <Text style={styles.price}>$ 45,13</Text>
                    </View>

                    <Divider style={{ marginVertical: 20 }} />

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 18 }}>Sub. sugerido</Text>
                        <Text style={styles.price}>$ 45,13</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={{ fontSize: 12 }} >Sub. Materiales</Text>
                        <Text style={styles.price}>$ 45,13</Text>
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 18 }}>Sub. aceptado</Text>
                        <Text style={styles.price}>$ 45,13</Text>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                        <Text style={{ fontSize: 12 }} >Sub. Materiales</Text>
                        <Text style={styles.price}>$ 45,13</Text>
                    </View>


                </ScrollView>
            </View>

        </ModalLayout>
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
    price: {
        fontSize: 18,
        color: 'green',
        fontWeight: 'bold'
    }

})