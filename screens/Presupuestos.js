import { useContext, useEffect, useState } from "react"
import { RefreshControl, Text, View } from "react-native"
import { Layout } from "../components/ui/Layout"
import { CustomPresupuestoItem } from "../components/presupuestos/CustomPresupuestoItem"
import { PresupuestoServiceContext } from "../contexts/PresupuestosService"
import { AuthContext } from "../contexts/AuthProvider"
import { ValidateSessionModal } from "../components/presupuestos/ValidateSessionModal"

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
    const { validateSession } = useContext(AuthContext)

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = () => {
        setRefreshing(true)
        setModalVisible(true)
        setRefreshing(false)
    }

    const [modalVisible, setModalVisible] = useState(false)

    const presupuestosArr = Object.values(presupuestos).reverse()
    const presupuestosToCreateArr = Object.values(presupuestosToCreate)
    const presupuestosToUpdateArr = Object.values(presupuestosToUpdate)



    return (
        <>

            <ValidateSessionModal visible={modalVisible} setVisible={setModalVisible} validateSession={validateSession} />
            <Layout
                styles={{ paddingHorizontal: 10, gap: 30 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                {
                    presupuestosToCreateArr.length
                        ? (
                            <PresupuestosBox title='Locales creados'>
                                {presupuestosToCreateArr.map((presup, i) => (
                                    <CustomPresupuestoItem key={i} presupuestoSF={presup} />
                                ))}
                            </PresupuestosBox>
                        )
                        : null
                }

                {
                    presupuestosToUpdateArr.length
                        ? (
                            <PresupuestosBox title='Locales actualizados'>
                                {presupuestosToUpdateArr.map((presup, i) => (
                                    <CustomPresupuestoItem key={i} presupuestoSF={presup} />
                                ))}
                            </PresupuestosBox>
                        )
                        : null
                }

                {
                    presupuestosArr.length
                        ? (
                            <PresupuestosBox title='En nube'>
                                {presupuestosArr.map(presup => (
                                    <CustomPresupuestoItem key={presup.abono.presup_id} presupuestoSF={presup} />
                                ))}
                            </PresupuestosBox>
                        )
                        : null
                }
            </Layout>
        </>

    )
}

export default Presupuestos