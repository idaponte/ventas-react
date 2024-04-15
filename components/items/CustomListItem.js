import { Text, TouchableOpacity } from "react-native"

export const CustomListItem = ({ itemName, itemQty, itemAcep, onPress }) => {
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
            <Text style={{ flex: 3 }}>{itemName}</Text>
            <Text style={{ flex: 1 }}>{itemQty}</Text>
            <Text style={{ flex: 1 }}>{itemAcep}</Text>
        </TouchableOpacity>
    )
}