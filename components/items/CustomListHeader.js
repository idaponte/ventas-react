import { View, Text } from "react-native"

export const CustomListHeader = () => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            width: '100%'
        }}>
            <Text style={{ flex: 3, fontWeight: 'bold' }}>Nombre</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Cant.</Text>
            <Text style={{ flex: 1, fontWeight: 'bold' }}>Acep.</Text>
        </View>
    )
}