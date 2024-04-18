import { StyleSheet, Text, TextInput, View } from "react-native"

import { useContext, useState } from "react";
import { Layout } from "../../components/ui/Layout";
import { PresupContext } from "../../contexts/PresupProvider";

const MyInput = ({ label, value, onChange, placeholder = '' }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput cursorColor='#000' style={styles.input} placeholder={placeholder} value={value} onChangeText={onChange} />
        </View>
    )
}

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
        setPresupuesto,
    } = useContext(PresupContext);

    const handleCustomerChange = (key, value) => {
        setPresupuesto({
            ...presupuesto,
            customer: {
                ...presupuesto.customer,
                [key]: value
            }
        })
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
                <MyInput label="Nombre" value={presupuesto.name} onChange={text => handleCustomerChange('name', text)} />
                <MyInput label="Apellido" value={presupuesto.ape} onChange={text => handleCustomerChange('ape', text)} />
                <InputGroup>
                    <MyInput label="Ciudad" value={presupuesto.customer.domicilio.ciudad} onChange={text => handleDomicilioData('ciudad', text)} />
                    <MyInput label="Código postal" value={presupuesto.customer.domicilio.cp} onChange={text => handleDomicilioData('cp', text)} />
                </InputGroup>
                <InputGroup>
                    <MyInput label="Calle" value={presupuesto.customer.domicilio.calle} onChange={text => handleDomicilioData('calle', text)} />
                    <MyInput label="Nro" value={presupuesto.customer.domicilio.nro} onChange={text => handleDomicilioData('nro', text)} />
                </InputGroup>
                <MyInput label="Entre" value={presupuesto.customer.domicilio.entre} onChange={text => handleDomicilioData('entre', text)} />

                <InputGroup>
                    <MyInput label="Piso" value={presupuesto.customer.domicilio.piso} onChange={text => handleDomicilioData('piso', text)} />
                    <MyInput label="Oficina" value={presupuesto.customer.domicilio.oficina} onChange={text => handleDomicilioData('ofi', text)} />
                </InputGroup>

                <InputGroup>
                    <MyInput label="Cel. pre." value={presupuesto.customer.contacto.cel_pre} onChange={text => handleContactoData('cel_pre', text)} />
                    <MyInput label="Cel. car." value={presupuesto.customer.contacto.cel_car} onChange={text => handleContactoData('cel_car', text)} />
                    <MyInput label="Cel. nro." value={presupuesto.customer.contacto.cel_nbr} onChange={text => handleContactoData('cel_nbr', text)} />
                </InputGroup>

                <InputGroup>
                    <MyInput label="Tel. pre." value={presupuesto.customer.contacto.tel_pre} onChange={text => handleContactoData('tel_pre', text)} />
                    <MyInput label="Tel. car." value={presupuesto.customer.contacto.tel_car} onChange={text => handleContactoData('tel_car', text)} />
                    <MyInput label="Tel. nro." value={presupuesto.customer.contacto.tel_nbr} onChange={text => handleContactoData('tel_nbr', text)} />
                </InputGroup>
                <MyInput label="Email" value={presupuesto.customer.contacto.email} onChange={text => handleContactoData('email', text)} />
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