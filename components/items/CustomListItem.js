import { Text, TouchableOpacity } from "react-native"
import { formatPrice } from "../../utils/currencyFormatter"
import Icon from 'react-native-vector-icons/MaterialIcons'
import { View } from "react-native"


export const CustomListItem = ({ item, onPress }) => {


    return (
        <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 15,
            height: 80,
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
            <View style={{ flex: 4, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.name}</Text>
                {
                    item.observ && <Icon name='comment' size={10} color='#000' style={{ marginRight: 5 }} />
                }
            </View>
            <Text style={{ flex: 1, textAlign: 'right' }}>{item.qty}</Text>
            <Text style={{ flex: 2, textAlign: 'right' }}>{`${formatPrice(item.qty * Number(item.precio))}`}</Text>
        </TouchableOpacity>
    )
}
