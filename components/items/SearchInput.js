import { BottomSheet, Button, Icon, ListItem } from "@rneui/themed";
import { useContext, useEffect, useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { globalColors, globalStyles } from "../../styles/globals";
import { SearchResultsModal } from "../modals/SearchResultsModal";
import { DataContext } from "../../contexts/DataProvider";
import { showToast } from "../../utils/showToast";

export const SearchInput = () => {
    const { searchItems } = useContext(DataContext);

    const [data, setData] = useState([])

    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <View style={styles.searchInputContainer}>
                <TextInput
                    style={{
                        ...styles.input,
                        ...globalStyles.inputBorder
                    }}
                    value={text}
                    onChangeText={setText}
                    placeholder="Buscar"

                />

                <TouchableOpacity style={{
                    backgroundColor: globalColors.primary[500],
                    padding: 10,
                    borderRadius: 7
                }} onPress={() => {
                    if (!text) {
                        showToast('Ingrese un término de búsqueda')
                        return
                    }

                    const results = searchItems(text)

                    if (results.length === 0) {
                        showToast('No hay resultados')
                        return
                    }

                    setData(results)
                    setIsVisible(true)
                }}>

                    <Icon name="search" color="white" />
                </TouchableOpacity>
            </View >

            <SearchResultsModal data={data} isVisible={isVisible} setIsVisible={setIsVisible} />
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