import { Text as RNText } from 'react-native'

export const Text = ({ children }) => {
    return (
        <RNText>
            {children}
        </RNText>
    )
}

export const TextSuccess = ({
    children,
    size = 16,
    weight = 'normal',
    center = false
}) => {
    return (
        <RNText style={{
            color: 'green',
            fontSize: size,
            fontWeight: weight,
            textAlign: center ? 'center' : 'left'
        }}>
            {children}
        </RNText>
    )
}

export const TextError = ({
    children,
    size = 16,
    weight = 'normal',
    center = false
}) => {
    return (
        <RNText style={{
            color: 'red',
            fontSize: size,
            fontWeight: weight,
            textAlign: center ? 'center' : 'left'
        }}>
            {children}
        </RNText>
    )
}

export const TextWarning = ({
    children,
    size = 16,
    weight = 'normal',
    center = false
}) => {
    return (
        <RNText style={{
            color: 'orange',
            fontSize: size,
            fontWeight: weight,
            textAlign: center ? 'center' : 'left'
        }}>
            {children}
        </RNText>
    )
}

export const TextInfo = ({
    children,
    size = 16,
    weight = 'normal',
    center = false
}) => {
    return (
        <RNText style={{
            color: 'blue',
            fontSize: size,
            fontWeight: weight,
            textAlign: center ? 'center' : 'left'
        }}>
            {children}
        </RNText>
    )
}

export const TextPrimary = ({
    children,
    size = 16,
    weight = 'normal',
    center = false,
    style = {}
}) => {
    return (
        <RNText style={{
            ...style,
            color: 'black',
            fontSize: size,
            fontWeight: weight,
            textAlign: center ? 'center' : 'left'
        }}>
            {children}
        </RNText>
    )
}