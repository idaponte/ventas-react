import { useContext, useEffect } from "react";
import { View } from "react-native";
import { SearchInput } from "./SearchInput";
import { Dropdown } from "../ui";
import { DataContext } from "../../contexts/DataProvider";
import { PresupContext } from "../../contexts/PresupProvider";

export const ItemsScreenHeader = () => {
    const { rubros, getRubroById, getItemsById } = useContext(DataContext);
    const { presupuesto, setPresupuesto, addItem, resetItems } = useContext(PresupContext);

    const items = rubros.map(rubro => {
        return {
            label: rubro.name,
            value: rubro.rubro_id
        }
    })



    const handleRubroChange = (item) => {
        setPresupuesto(oldPresup => ({
            ...oldPresup,
            oper: {
                ...oldPresup.oper,
                rubroId: item.value
            }
        }))

        const esRobo = item.label.toLowerCase() === 'robo'
        const esCctv = item.label.toLowerCase() === 'cctv'

        if (esRobo) {
            resetItems()

            const items = getItemsById([24, 1, 8, 9, 10, 11]);

            for (let item of items) {
                addItem(item)
            }

        }

        if (esCctv) {
            resetItems()
            const items = getItemsById([24, 14, 88]);

            for (let item of items) {
                addItem(item)
            }
        }
    }

    return (
        <>
            <View style={{ gap: 10, marginBottom: 20 }}>
                <Dropdown
                    data={items}
                    value={getRubroById(presupuesto.oper.rubroId)?.label || ''}
                    onChange={handleRubroChange} />
                <SearchInput />
            </View>

        </>
    )
}