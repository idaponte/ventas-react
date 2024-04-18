import { Text, View } from "react-native"
import { Layout } from "../components/ui/Layout"
import { ShadowView } from "../components/ui/ShadowView"
import { CustomPresupuestoItem } from "../components/presupuestos/CustomPresupuestoItem"

const PresupuestosBox = ({
    children,
    title
}) => {
    return (
        <View style={{
            borderColor: 'grey',
            borderRadius: 10,
            borderWidth: 1,
            position: 'relative',
            height: 100,
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 10,
        }}>
            <Text
                style={{
                    position: 'absolute',
                    top: -10,
                    left: 20,
                    paddingHorizontal: 5,
                    backgroundColor: 'white',
                    color: 'grey',
                }}
            >
                {title}
            </Text>

            {children}

        </View>
    )
}

const Presupuestos = () => {
    return (
        <Layout>
            <PresupuestosBox title='En nube'>
                <CustomPresupuestoItem nombre="Ignacio da Ponte" domicilio="Calle falsa 123" estado='Facturado' />
            </PresupuestosBox>
        </Layout>
    )
}

export default Presupuestos