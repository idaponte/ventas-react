import { useContext, useEffect, useState } from "react";
import { globalStyles } from "../../styles/globals";
import { SearchInput } from "./SearchInput";
import { Text, View, TouchableOpacity } from "react-native";
import { RubroSelectModal } from "../modals/RubroSelectModal";
import { Dropdown } from "../Dropdown";
import { DataContext } from "../../contexts/DataProvider";

export const ItemsScreenHeader = () => {
    const { rubros } = useContext(DataContext);

    const [items, setItems] = useState(
        rubros.map(rubro => {
            return {
                label: rubro.name,
                value: rubro.rubro_id
            }
        }) || []
    );

    return (
        <>
            <View style={{
                gap: 10,
                marginBottom: 20
            }}>
                <Dropdown data={items} defaultValue="Seleccione un rubro" />
                <SearchInput />
            </View>

        </>
    )
}