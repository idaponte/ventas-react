import { ScrollView, View } from 'react-native';

export const Layout = ({ children, styles = {}, onScrollEndDrag = () => { } }) => {

    return (
        <ScrollView
            onScrollEndDrag={onScrollEndDrag}
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
