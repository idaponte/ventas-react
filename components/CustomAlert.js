import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { Input as CustomInput } from './ui/Input';
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

const Button = ({ onPress, children, disabled = false }) => {
    return (
        <TouchableOpacity disabled={disabled} onPress={onPress} style={{ padding: 10 }}>
            <Text style={{ color: globalColors.primary[700] }}>{children}</Text>
        </TouchableOpacity>
    );
};

const Input = ({ keyboardType = 'default', onChangeText, isPsw = false, text = '', placeholder = '' }) => {
    return (
        <CustomInput
            keyboardType={keyboardType}
            isPsw={isPsw}
            onChange={onChangeText}
            value={text}
            placeholder={placeholder}
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
