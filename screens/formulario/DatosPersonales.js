import { useContext } from "react";
import { StyleSheet, View } from "react-native"

import { Layout, Input } from "../../components/ui";
import { PresupContext } from "../../contexts";


const InputGroup = ({ children }) => {
    return (
        <View style={styles.inputGroup}>
            {children}
        </View>
    )
}

const DatosPersonales = () => {
    const {
        presupuesto,
        isPresupEditable,
        setPresupuesto,
    } = useContext(PresupContext);

    const handleCustomerChange = (key, value) => {
        setPresupuesto(oldPresup => ({
            ...oldPresup,
            customer: {
                ...oldPresup.customer,
                [key]: value
            }
        }))
    }


    const handleDomicilioData = (key, value) => {
        setPresupuesto({
            ...presupuesto,
            customer: {
                ...presupuesto.customer,
                domicilio: {
                    ...presupuesto.customer.domicilio,
                    [key]: value
                }
            }
        })
    }

    const handleContactoData = (key, value) => {
        setPresupuesto({
            ...presupuesto,
            customer: {
                ...presupuesto.customer,
                contacto: {
                    ...presupuesto.customer.contacto,
                    [key]: value
                }
            }
        })
    }


    return (
        <Layout>
            <View style={styles.form}>
                <Input editable={isPresupEditable} label="Nombre (*)" value={presupuesto.customer.name} onChange={text => handleCustomerChange('name', text)} />
                <Input editable={isPresupEditable} label="Apellido (*)" value={presupuesto.customer.ape} onChange={text => handleCustomerChange('ape', text)} />
                <InputGroup>
                    <Input editable={isPresupEditable} label="Ciudad (*)" value={presupuesto.customer.domicilio.ciudad} onChange={text => handleDomicilioData('ciudad', text)} />
                    <Input editable={isPresupEditable} label="Código postal (*)" value={presupuesto.customer.domicilio.cp} onChange={text => handleDomicilioData('cp', text)} />
                </InputGroup>
                <InputGroup>
                    <Input editable={isPresupEditable} label="Calle (*)" value={presupuesto.customer.domicilio.calle} onChange={text => handleDomicilioData('calle', text)} />
                    <Input editable={isPresupEditable} label="Número" value={presupuesto.customer.domicilio.nro} onChange={text => handleDomicilioData('nro', text)} />
                </InputGroup>
                <Input editable={isPresupEditable} label="Entre" value={presupuesto.customer.domicilio.entre} onChange={text => handleDomicilioData('entre', text)} />

                <InputGroup>
                    <Input editable={isPresupEditable} label="Piso" value={presupuesto.customer.domicilio.piso} onChange={text => handleDomicilioData('piso', text)} />
                    <Input editable={isPresupEditable} label="Oficina" value={presupuesto.customer.domicilio.oficina} onChange={text => handleDomicilioData('ofi', text)} />
                </InputGroup>

                <InputGroup>
                    <Input editable={isPresupEditable} label="Cel. pre." keyboardType="numeric" value={presupuesto.customer.contacto.cel_pre} onChange={text => handleContactoData('cel_pre', text)} />
                    <Input editable={isPresupEditable} label="Cel. car." keyboardType="numeric" value={presupuesto.customer.contacto.cel_car} onChange={text => handleContactoData('cel_car', text)} />
                    <Input editable={isPresupEditable} label="Cel. nro." keyboardType="numeric" value={presupuesto.customer.contacto.cel_nbr} onChange={text => handleContactoData('cel_nbr', text)} />
                </InputGroup>

                <InputGroup>
                    <Input editable={isPresupEditable} label="Tel. pre." keyboardType="numeric" value={presupuesto.customer.contacto.tel_pre} onChange={text => handleContactoData('tel_pre', text)} />
                    <Input editable={isPresupEditable} label="Tel. car." keyboardType="numeric" value={presupuesto.customer.contacto.tel_car} onChange={text => handleContactoData('tel_car', text)} />
                    <Input editable={isPresupEditable} label="Tel. nro." keyboardType="numeric" value={presupuesto.customer.contacto.tel_nbr} onChange={text => handleContactoData('tel_nbr', text)} />
                </InputGroup>
                <Input editable={isPresupEditable} label="Email" keyboardType="email-address" value={presupuesto.customer.contacto.email} onChange={text => handleContactoData('email', text)} />
            </View>
        </Layout>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: 20
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 10
    },
    inputContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
    },
    label: {
        fontSize: 18,
        marginBottom: 5
    },
    input: {
        borderRadius: 7,
        padding: 10,
        height: 50,
        borderWidth: 1,
        borderColor: '#a8a8a8',
    },
    text: {
        fontSize: 24
    }
});

export default DatosPersonales;