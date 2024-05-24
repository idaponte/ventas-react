import { Text, TouchableOpacity } from "react-native"
import { View } from "react-native"
import { formatPrice } from "../../utils"


export const CustomListItem = ({ item, onPress }) => {


    return (
        <TouchableOpacity style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 15,
            height: 60,
            borderRadius: 10,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            position: 'relative',
        }}
            onPress={onPress}
        >
            {item.observ && <View style={{
                backgroundColor: '#2c2c2c',
                width: 100,
                borderRadius: 10,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 0,
                position: 'absolute',
                top: 0,
                left: 0,
                paddingVertical: 2,
            }}>
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 10 }}>Comentado</Text>
            </View>}

            <View style={{ flex: 4, display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{item.name}</Text>
                {/* {item.observ && <Icon name='comment' size={10} color='#000' style={{ marginRight: 5 }} />} */}
            </View>
            <Text style={{ flex: 1, textAlign: 'right' }}>{item.qty}</Text>
            <Text style={{ flex: 2, textAlign: 'right' }}>{`${formatPrice(item.qty * item.precio)}`}</Text>
        </TouchableOpacity>
    )
}
