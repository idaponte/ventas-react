import { ScrollView, View } from 'react-native';

export const Layout = ({ children, styles = {}, refreshControl = null }) => {

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            endFillColor="#000"
            overScrollMode="never"
            keyboardShouldPersistTaps="handled"
            style={{ backgroundColor: '#fbfbfb' }}
            refreshControl={refreshControl}
        >
            <View style={{ flex: 1, padding: 20, ...styles }}>
                {children}
            </View>
        </ScrollView>
    )
}
