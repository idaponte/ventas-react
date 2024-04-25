import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal } from 'react-native';
import { globalColors } from '../styles/globals';

const CustomAlert = ({ visible, onRequestClose, children }) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const Header = ({ children }) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{children}</Text>
        </View>
    );
};

const Body = ({ children }) => {
    return (
        <View style={{ marginBottom: 10 }}>
            {children}
        </View>
    );
};

const Message = ({ children }) => {
    return (
        <View style={{ marginBottom: 10 }}>
            <Text style={{ fontStyle: 'italic' }}>{children}</Text>
        </View>
    );
};

const Footer = ({ children }) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            {children}
        </View>
    );
};

const Button = ({ onPress, children }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ padding: 10 }}>
            <Text style={{ color: globalColors.primary[700] }}>{children}</Text>
        </TouchableOpacity>
    );
};

const Input = ({ keyboardType = 'default', onChangeText, isPsw = false, text = '' }) => {
    return (
        <TextInput
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 10, marginBottom: 10 }}
            keyboardType={keyboardType}
            secureTextEntry={!!isPsw}
            onChangeText={onChangeText}
            value={text}
        />
    );
};

CustomAlert.Header = Header;
CustomAlert.Body = Body;
CustomAlert.Message = Message;
CustomAlert.Footer = Footer;
CustomAlert.Button = Button;
CustomAlert.Input = Input;

export default CustomAlert;
