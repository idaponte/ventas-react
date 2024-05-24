import { useContext, useState } from "react"
import { Layout } from "../components/ui"
import { CustomPresupuestoItem } from "../components/presupuestos/CustomPresupuestoItem"
import { PresupuestoServiceContext } from "../contexts"
import { PresupuestosBox } from "../components/presupuestos/PresupuestosBox"
import { useValidateSession } from "../hooks/useValidateSession"
import { useRefresh } from "../hooks/useRefresh"

const Presupuestos = () => {

    const { presupuestos, presupuestosToCreate, presupuestosToUpdate } = useContext(PresupuestoServiceContext)


    const presupuestosArr = Object.values(presupuestos).reverse()
    const presupuestosToCreateArr = Object.values(presupuestosToCreate)
    const presupuestosToUpdateArr = Object.values(presupuestosToUpdate)

    const [ValidateSessionModal, setModalVisible] = useValidateSession()
    const [Control] = useRefresh(() => setModalVisible(true))

    return (
        <>
            <ValidateSessionModal />

            <Layout
                styles={{ paddingHorizontal: 10, gap: 30 }}
                refreshControl={<Control />}
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