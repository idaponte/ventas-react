import { Text, TouchableOpacity } from 'react-native'
import { globalColors } from '../../styles/globals'

export const Button = ({
    onPress,
    title,
    style = {},
}) => {
    return (
        <TouchableOpacity
            style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                backgroundColor: globalColors.primary[600],
                borderRadius: 50,
                ...style
            }}
            onPress={onPress}
        >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
                {title}
            </Text>
        </TouchableOpacity>


    )
}
