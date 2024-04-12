import { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import { globalStyles } from "../../styles/globals";
import { SearchInput } from "./SearchInput";
import { View } from "react-native";

export const ItemsScreenHeader = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);

    return (
        <View style={{
            gap: 10,
            paddingHorizontal: 20,
            marginBottom: 20
        }}>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={globalStyles.input}
            />

            <SearchInput />
        </View>
    )
}