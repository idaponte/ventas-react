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
    let buttonStyles;
    let textColor = disabled ? globalColors.grey[500] : color;
    let backgroundColor = 'transparent'
    let finalUnderlayColor = underlayColor

    switch (variant) {
        case 'outlined':
            buttonStyles = {
                borderWidth: 1,
                borderColor: color,
            };
            underlayColor = globalColors.grey[100];
            break;
        case 'text':
            break;
        default:
            backgroundColor = disabled ? globalColors.grey[500] : color;
            textColor = 'white';
            break;
    }

    return (
        <TouchableHighlight
            style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 50,
                backgroundColor,
                textColor,
                ...buttonStyles,
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

export const CloseButton = ({ onPress, title = 'Cerrar', style = {} }) => {
    return (
        <Button
            onPress={onPress}
            title={title}
            color={globalColors.grey[600]}
            underlayColor={globalColors.grey[800]}
            style={style}
        />
    );
}

Button.Close = CloseButton;