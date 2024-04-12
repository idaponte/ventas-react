import { ScrollView, View } from "react-native"
import { CustomListHeader } from "./CustomListHeader"
import { CustomListItem } from "./CustomListItem"

export const ItemsList = () => {
    return (
        <ScrollView >
            <View style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                padding: 0,
                flex: 1,
                marginBottom: 20,
                paddingHorizontal: 20
            }}>

                <CustomListHeader />


                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador " itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador inalámbrico" itemQty="3" itemAcep="$45,13" onPress={() => { }} />
                <CustomListItem itemName="Comunicador infasdfdalámbrico" itemQty="3" itemAcep="$45s,13" onPress={() => { }} />

            </View>
        </ScrollView>
    )
}