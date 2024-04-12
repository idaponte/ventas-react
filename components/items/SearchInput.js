import { BottomSheet, Button, Icon, ListItem } from "@rneui/themed";
import { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";

export const SearchInput = () => {
    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const list = [
        { title: 'List Item 1' },
        { title: 'List Item 2' },
        {
            title: 'Cancel',
            containerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'white' },
            onPress: () => setIsVisible(false),
        },
    ];

    return (
        <>
            <View style={styles.searchInputContainer}>
                <TextInput
                    style={styles.input}
                    value={text}
                    onChangeText={setText}
                    placeholder="Buscar"

                />

                <TouchableOpacity style={{
                    backgroundColor: 'blue',
                    padding: 10,
                    borderRadius: 7
                }} onPress={() => setIsVisible(true)}>

                    <Icon name="search" color="white" />
                </TouchableOpacity>
            </View >

            <BottomSheet modalProps={{}} isVisible={isVisible}>
                {list.map((l, i) => (
                    <ListItem
                        key={i}
                        containerStyle={l.containerStyle}
                        onPress={l.onPress}
                    >
                        <ListItem.Content>
                            <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </BottomSheet>
        </>
    )
}


const styles = StyleSheet.create({
    searchInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10
    },
    input: {
        backgroundColor: '#fff',

        borderRadius: 7,
        padding: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#a8a8a8',
        flex: 1
    },
});