import { Modal, ScrollView, Text, View, StyleSheet, TextInput } from "react-native"
import { Button, Divider } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalColors } from "../../styles/globals";
import { useContext, useEffect, useState } from "react";
import { ModalLayout } from "./ModalLayout";
import { PresupContext } from "../../contexts/PresupProvider";
import { Input } from "../ui/Input";

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

export const ItemDetailsModal = ({ isVisible, setIsVisible, item }) => {
    const { presupuesto, setPresupuesto } = useContext(PresupContext)

    const [sugerido, setSugerido] = useState(item?.sqty || 0)
    const [aceptado, setAceptado] = useState(item?.qty || 0)




    const handleDelete = () => {
        const newItems = presupuesto.items.filter(i => i.generic_id !== item.generic_id)

        setPresupuesto({
            ...presupuesto,
            items: newItems
        })

        setIsVisible(!isVisible)
    }

    const handleComentarios = (value = '') => {
        const newItems = presupuesto.items.map(i => {
            if (i.generic_id === item.generic_id) {
                return {
                    ...i,
                    observ: value
                }
            }
            return i
        })

        setPresupuesto({
            ...presupuesto,
            items: newItems
        })
    }


    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
            <View style={styles.modalContent}>
                <ScrollView>

                    <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18 }}>{item.name} ({item.generic_id})</Text>
                        <Button color={globalColors.danger} size='sm' onPress={handleDelete}><Icon color='white' name="trash" /></Button>
                    </View>

                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                        <Counter
                            title='Sugerido'
                            cant={sugerido}
                            setCant={cant => setSugerido(cant)}
                        />

                        <Counter
                            title='Aceptado'
                            cant={aceptado}
                            setCant={cant => setAceptado(cant)}
                        />
                    </View>

                    <View style={{ display: 'flex', }}>
                        <Text style={{ fontSize: 18, marginBottom: 5 }}>Comentarios (*)</Text>
                        <Input multiline={true} numberOfLines={4} onChange={handleComentarios} />
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