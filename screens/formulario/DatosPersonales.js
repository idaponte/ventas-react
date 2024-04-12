import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"

import { useState } from "react";
import { Layout } from "../../components/ui/Layout";

const MyInput = ({ label, value, onChange }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput cursorColor='#000' style={styles.input} value={value} onChangeText={onChange} />
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
    const [personalData, setPersonalData] = useState({
        nombre: '',
        apellido: '',
        ciudad: '',
        cp: '',
        calle: '',
        nro: '',
        entre: '',
        piso: '',
        oficina: '',
        celPre: '',
        celCar: '',
        celNro: '',
        telPre: '',
        telCar: '',
        telNro: '',
        email: ''
    });

    const handleChange = (key, value) => {
        setPersonalData({
            ...personalData,
            [key]: value
        })
    }

    return (
        <Layout>
            <ScrollView>
                <View style={styles.form}>
                    <Text style={styles.text}>Datos Personales</Text>
                    <MyInput label="Nombre" value={personalData.nombre} onChange={text => handleChange('nombre', text)} />
                    <MyInput label="Apellido" value={personalData.apellido} onChange={text => handleChange('apellido', text)} />
                    <InputGroup>
                        <MyInput label="Ciudad" value={personalData.ciudad} onChange={text => handleChange('ciudad', text)} />
                        <MyInput label="CP" value={personalData.cp} onChange={text => handleChange('cp', text)} />
                    </InputGroup>
                    <InputGroup>
                        <MyInput label="Calle" value={personalData.calle} onChange={text => handleChange('calle', text)} />
                        <MyInput label="Nro" value={personalData.nro} onChange={text => handleChange('nro', text)} />
                    </InputGroup>
                    <MyInput label="Entre" value={personalData.entre} onChange={text => handleChange('entre', text)} />

                    <InputGroup>
                        <MyInput label="Piso" value={personalData.piso} onChange={text => handleChange('piso', text)} />
                        <MyInput label="Oficina" value={personalData.oficina} onChange={text => handleChange('oficina', text)} />
                    </InputGroup>

                    <InputGroup>
                        <MyInput label="Cel. pre." value={personalData.celPre} onChange={text => handleChange('celPre', text)} />
                        <MyInput label="Cel. car." value={personalData.celCar} onChange={text => handleChange('celCar', text)} />
                        <MyInput label="Cel. nro." value={personalData.celNro} onChange={text => handleChange('celNro', text)} />
                    </InputGroup>

                    <InputGroup>
                        <MyInput label="Tel. pre." value={personalData.telPre} onChange={text => handleChange('telPre', text)} />
                        <MyInput label="Tel. car." value={personalData.telCar} onChange={text => handleChange('telCar', text)} />
                        <MyInput label="Tel. nro." value={personalData.telNro} onChange={text => handleChange('telNro', text)} />
                    </InputGroup>
                    <MyInput label="Email" value={personalData.email} onChange={text => handleChange('email', text)} />
                </View>
            </ScrollView>
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
        padding: 20,
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