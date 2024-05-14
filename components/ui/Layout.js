import { ScrollView, View } from 'react-native';

export const Layout = ({ children, styles = {} }) => {

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            endFillColor="#000"
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: '#fbfbfb' }}
        >
            <View style={{ flex: 1, padding: 20, ...styles }}>
                {children}
            </View>
        </ScrollView>
    )
}
