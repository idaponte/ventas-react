import { Text, TouchableHighlight } from 'react-native'
import { globalColors } from '../../styles/globals'
export const Button = ({
    onPress,
    title,
    style = {},
    color = globalColors.primary[600],
    underlayColor = globalColors.primary[800],
    variant = 'primary',
    disabled = false,
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
        <TouchableHighlight
            style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
                ...buttonStyle,
                ...style,
            }}
            disabled={disabled}
            onPress={onPress}
            underlayColor={underlayColor}
        >
            <Text style={{ color: textColor, textAlign: 'center', fontWeight: '600', fontSize: 16 }}>
                {title}
            </Text>
        </TouchableHighlight>
    );
};
