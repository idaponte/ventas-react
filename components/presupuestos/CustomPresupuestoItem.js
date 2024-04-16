import { useState } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ModalLayout } from '../modals/ModalLayout'

export const CustomPresupuestoItem = ({
    domicilio,
    nombre,
    estado,
}) => {
    const [show, setShow] = useState(false)


    return (
        <>
            <TouchableOpacity style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 10,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                borderLeftColor: 'green',
                borderLeftWidth: 8,
            }}
                onPress={() => setShow(true)}
            >
                <Text>{nombre}</Text>
                <Text>{domicilio}</Text>
                {/* <Text>{estado}</Text> */}
            </TouchableOpacity>

            <ModalLayout isVisible={show} setIsVisible={setShow}>
                <ModalLayout.Content>
                    <Text style={{
                        fontSize: 24,
                        marginBottom: 20,
                    }}>
                        Presupuesto
                    </Text>
                </ModalLayout.Content>
            </ModalLayout>

        </>

    )
}
