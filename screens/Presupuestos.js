import { useContext, useEffect } from "react"
import { Text, View } from "react-native"
import { Layout } from "../components/ui/Layout"
import { CustomPresupuestoItem } from "../components/presupuestos/CustomPresupuestoItem"
import { PresupuestoServiceContext } from "../contexts/PresupuestosService"

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
            display: 'flex',
            justifyContent: 'center',
            paddingHorizontal: 20,
            gap: 10,
            paddingVertical: 30,
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

    const { presupuestos, presupuestosToCreate, presupuestosToUpdate } = useContext(PresupuestoServiceContext)

    return (
        <Layout styles={{ paddingHorizontal: 10, gap: 30 }}>
            {
                Object.keys(presupuestosToCreate).length
                    ? (
                        <PresupuestosBox title='Locales creados'>
                            {Object.values(presupuestosToCreate).map(presup => (
                                <CustomPresupuestoItem key={presup.abono.presup_id} presupuestoSF={presup} />
                            ))}
                        </PresupuestosBox>
                    )
                    : null
            }

            {
                Object.keys(presupuestosToUpdate).length
                    ? (
                        <PresupuestosBox title='Locales actualizados'>
                            {Object.values(presupuestosToUpdate).map(presup => (
                                <CustomPresupuestoItem key={presup.abono.presup_id} presupuestoSF={presup} />
                            ))}
                        </PresupuestosBox>
                    )
                    : null
            }

            {
                Object.keys(presupuestos).length
                    ? (
                        <PresupuestosBox title='En nube'>
                            {Object.values(presupuestos).map(presup => (
                                <CustomPresupuestoItem key={presup.abono.presup_id} presupuestoSF={presup} />
                            ))}
                        </PresupuestosBox>
                    )
                    : null
            }
        </Layout>
    )
}

export default Presupuestos