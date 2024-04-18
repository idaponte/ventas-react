import { View } from "react-native"

export const Row = ({ children }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            {children}
        </View>
    )
}

export const RowBetween = ({ children }) => {
    return (
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
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


