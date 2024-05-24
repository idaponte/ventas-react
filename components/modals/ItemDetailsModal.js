import { useContext } from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native"
import { Button as RNButton, Divider } from "@rneui/themed";
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalColors } from "../../styles/globals";
import { ModalLayout } from "./ModalLayout";
import { Input, Button } from "../ui";
import { DataContext, PresupContext } from "../../contexts";

import { formatPrice, showToast } from "../../utils";

const Counter = ({ title, cant, setCant, base = 0, disabled = false }) => {

    const handleCant = (cant) => {
        if (cant < base) return;
        setCant(cant);
    }

    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text style={{ fontSize: 18 }}>{title}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <RNButton color='lightgrey' size='md' disabled={cant === 0 || disabled} onPress={() => handleCant(cant - 1)}><Icon name="minus" /></RNButton>
                <Text style={{ marginHorizontal: 20, fontSize: 18 }} >{cant}</Text>
                <RNButton disabled={disabled} color='lightgrey' size='md' onPress={() => handleCant(cant + 1)}><Icon name="plus" /></RNButton>
            </View>
        </View>
    )
}

export const ItemDetailsModal = ({ isVisible, setIsVisible, itemId }) => {
    const { presupuesto, setPresupuesto, abonoInalambrico, handleDeleteItem, isPresupEditable } = useContext(PresupContext)
    const { esItemComunicador, precioMateriales } = useContext(DataContext)
    const item = presupuesto.items[itemId]

    const handleItemCant = (cant, type) => {

        if (!abonoInalambrico && esItemComunicador(item.generic_id)) {
            showToast('Seleccione un abono inalambrico')
            return
        }

        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: {
                ...oldPresup.items,
                [item.generic_id]: {
                    ...item,
                    [type]: cant
                }
            }
        }))
    }

    const handleComentarios = (value = '') => {
        setPresupuesto(oldPresup => ({
            ...oldPresup,
            items: {
                ...oldPresup.items,
                [item.generic_id]: {
                    ...item,
                    observ: value
                }
            }
        }))
    }


    return (
        <ModalLayout isVisible={isVisible} setIsVisible={setIsVisible}>
            <ModalLayout.Content>
                <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18 }}>{item?.name} ({item?.generic_id})</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'column' }}>
                    <Counter
                        disabled={!isPresupEditable}
                        title='Sugerido'
                        cant={item?.sqty}
                        setCant={(cant) => handleItemCant(cant, 'sqty')}
                    />

                    <Counter
                        disabled={!isPresupEditable}
                        title='Aceptado'
                        cant={item?.qty}
                        setCant={(cant) => handleItemCant(cant, 'qty')}
                    />
                </View>

                <View style={{ display: 'flex', }}>
                    <Text style={{ fontSize: 18, marginBottom: 5 }}>Comentarios (*)</Text>
                    <Input editable={isPresupEditable} multiline={true} numberOfLines={4} value={item?.observ} onChange={handleComentarios} />
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={{ fontSize: 18 }}>Precio</Text>
                    <Text style={styles.price}>${item?.precio}</Text>
                </View>

                <Divider style={{ marginVertical: 20 }} />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: 18 }}>Sub. sugerido</Text>
                    <Text style={styles.price}>{formatPrice(item?.precio * item?.sqty)}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 12 }} >Sub. Materiales</Text>
                    <Text style={styles.price}>{formatPrice(precioMateriales * item?.sqty)}</Text>
                </View>


                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 18 }}>Sub. aceptado</Text>
                    <Text style={styles.price}>{formatPrice(item?.precio * item?.qty)}</Text>
                </View>

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', }}>
                    <Text style={{ fontSize: 12 }} >Sub. Materiales</Text>
                    <Text style={styles.price}>{formatPrice(precioMateriales * item?.qty)}</Text>
                </View>

                <Button
                    disabled={isPresupEditable}
                    title="Eliminar"
                    onPress={() => {
                        const deleted = handleDeleteItem(item.generic_id)
                        if (deleted) setIsVisible(false)
                    }}
                    color={globalColors.danger[600]}
                    underlayColor={globalColors.danger[800]}
                    style={{ marginTop: 40 }}
                />
            </ModalLayout.Content>

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