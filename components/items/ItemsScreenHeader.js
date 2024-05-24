import { useContext } from "react";
import { View } from "react-native";
import { SearchInput } from "./SearchInput";
import { Dropdown } from "../ui";
import { PresupContext, DataContext } from "../../contexts";

export const ItemsScreenHeader = () => {
    const { rubros, getRubroById, getItemsById } = useContext(DataContext);
    const { presupuesto, isPresupEditable, setPresupuesto, tryAddItem, addComunicador, resetItems } = useContext(PresupContext);

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
            resetItems()

            const items = getItemsById([1, 8, 9, 10, 11]);

            addComunicador()
            for (let item of items) tryAddItem(item)
        }

        if (esCctv) {
            resetItems()
            const items = getItemsById([14, 88]);

            addComunicador()
            for (let item of items) tryAddItem(item)
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