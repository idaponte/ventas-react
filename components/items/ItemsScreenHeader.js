import { useContext, useEffect } from "react";
import { View } from "react-native";
import { SearchInput } from "./SearchInput";
import { Dropdown } from "../ui";
import { DataContext } from "../../contexts/DataProvider";
import { PresupContext } from "../../contexts/PresupProvider";

export const ItemsScreenHeader = () => {
    const { rubros, getRubroById, getItemsById } = useContext(DataContext);
    const { presupuesto, isPresupEditable, setPresupuesto, tryAddItem, resetItems } = useContext(PresupContext);

    const handleRubroChange = (item) => {
        setPresupuesto(oldPresup => ({
            ...oldPresup,
            oper: {
                ...oldPresup.oper,
                rubro_id: item.value
            }
        }))

        const esRobo = item.label.toLowerCase() === 'robo'
        const esCctv = item.label.toLowerCase() === 'cctv'

        if (esRobo) {
            // TODO: debe poder agregarse el comunicador (id 24). Consultar si se agrega con qty en 0 o 1
            resetItems()

            const items = getItemsById([24, 1, 8, 9, 10, 11]);

            for (let item of items) {
                tryAddItem(item)
            }

        }

        if (esCctv) {
            resetItems()
            const items = getItemsById([24, 14, 88]);

            for (let item of items) {
                tryAddItem(item)
            }
        }
    }

    return (
        <>
            <View style={{ gap: 10, marginBottom: 20 }}>
                <Dropdown
                    editable={isPresupEditable}
                    data={rubros}
                    value={getRubroById(presupuesto.oper.rubro_id)?.label || ''}
                    onChange={handleRubroChange} />
                <SearchInput />
            </View>

        </>
    )
}