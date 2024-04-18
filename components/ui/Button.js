import { Text, TouchableOpacity } from 'react-native'
import { globalColors } from '../../styles/globals'
export const Button = ({
    onPress,
    title,
    style = {},
    color = globalColors.primary[600],
    variant = 'primary',
}) => {
    let buttonStyle;
    let textColor;

    switch (variant) {
        case 'outlined':
            buttonStyle = {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: color,
            };
            textColor = color;
            break;
        case 'text':
            buttonStyle = {
                backgroundColor: 'transparent',
            };
            textColor = color;
            break;
        default:
            buttonStyle = {
                backgroundColor: color,
                borderRadius: 50,
            };
            textColor = 'white';
            break;
    }

    return (
        <TouchableOpacity
            style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
                ...buttonStyle,
                ...style,
            }}
            onPress={onPress}
        >
            <Text style={{ color: textColor, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
