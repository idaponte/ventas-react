import { Text, TouchableOpacity } from "react-native"

export const CustomListItem = ({ item, onPress }) => {
    const priceFormatter = new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    })

    const formatPrice = (price = 0) => priceFormatter.format(price)

    return (
        <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
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
        }}
            onPress={onPress}
        >
            <Text style={{ flex: 3 }}>{item.name}</Text>
            <Text style={{ flex: 1 }}>{item.qty}</Text>
            <Text style={{ flex: 1 }}>{`${formatPrice(item.qty * Number(item.precio))}`}</Text>
        </TouchableOpacity>
    )
}
