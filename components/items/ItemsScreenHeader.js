import { useState } from "react";
import { globalStyles } from "../../styles/globals";
import { SearchInput } from "./SearchInput";
import { Text, View, TouchableOpacity } from "react-native";
import { RubroSelectModal } from "../modals/RubroSelectModal";
import { Dropdown } from "../Dropdown";

export const ItemsScreenHeader = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <View style={{
                gap: 10,
                marginBottom: 20
            }}>
                <Dropdown defaultValue="Seleccione un rubro" />
                <SearchInput />
            </View>

        </>
    )
}