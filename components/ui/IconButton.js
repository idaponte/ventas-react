import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { globalColors } from '../../styles/globals'


export const IconButton = ({
    onPress = () => { },
    icon = '',
    color = 'black',
    size = 24,
    style = {},
    ...props
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: globalColors.primary[600],
                ...style
            }}
        >
            <Icon name={icon} size={size} color={color} />
        </TouchableOpacity>
    )
}
