import { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { globalColors } from "../../styles/globals";
import { SearchResultsModal } from "../modals/SearchResultsModal";
import { DataContext, PresupContext } from "../../contexts";
import { showToast } from "../../utils";
import { Input } from "../ui";

export const SearchInput = () => {
    const { searchItems, getItemById } = useContext(DataContext);
    const { isPresupEditable, tryAddItem } = useContext(PresupContext);

    const [data, setData] = useState([])

    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const handleAddItem = (item) => {
        const precio = getItemById(item.value)

        const exito = tryAddItem(precio)

        if (exito) setText('')
        setIsVisible(false)
    }

    const handlePress = () => {
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
    }

    return (
        <>
            <View style={styles.searchInputContainer}>
                <Input
                    style={styles.input}
                    value={text}
                    onChange={setText}
                    placeholder="Buscar"
                />

                <TouchableOpacity
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: globalColors.primary[600],
                        borderRadius: 50,
                        padding: 11
                    }}
                    disabled={!isPresupEditable}
                    onPress={handlePress}
                >
                    <Icon name="search" size={25} color="white" />
                </TouchableOpacity>
            </View >

            <SearchResultsModal data={data} isVisible={isVisible} setIsVisible={setIsVisible} handleAddItem={handleAddItem} />
        </>
    )
}


const styles = StyleSheet.create({
    searchInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
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