import { View } from "react-native"

export const Row = ({ children, style = {} }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', ...style }}>
            {children}
        </View>
    )
}

export const RowBetween = ({ children, wrap = false }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: !!wrap ? 'wrap' : 'nowrap' }}>
            {children}
        </View>
    )
}

export const RowCenter = ({ children }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </View>
    )
}


