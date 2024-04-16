import { View } from 'react-native'

export const ShadowView = ({ children }) => {
    return (
        <View style={{
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 5,
        }}>
            {children}
        </View>
    )
}
