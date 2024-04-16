import { ScrollView, View } from 'react-native';

export const Layout = ({ children }) => {

    return (
        <ScrollView
            showsHorizontalScrollIndicator={false}
            endFillColor="#000"
            overScrollMode="never"
            style={{ backgroundColor: '#fff' }}
        >
            <View style={{ flex: 1, padding: 20 }}>
                {children}
            </View>
        </ScrollView>
    )
}
