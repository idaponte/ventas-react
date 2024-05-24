import { View, Text } from "react-native"

export const PresupuestosBox = ({ children, title }) => {
    return (
        <View style={{
            borderColor: 'grey',
            borderRadius: 10,
            borderWidth: 1,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 10,
            paddingVertical: 30,
        }}>
            <Text
                style={{
                    position: 'absolute',
                    top: -10,
                    left: 20,
                    paddingHorizontal: 5,
                    backgroundColor: 'white',
                    color: 'grey',
                }}
            >
                {title}
            </Text>

            {children}

        </View>
    )
}