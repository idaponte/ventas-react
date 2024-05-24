import { useState } from 'react';
import { ValidateSessionModal } from '../components/presupuestos/ValidateSessionModal';

export const useValidateSession = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const ModalComponent = () => (
        <ValidateSessionModal visible={modalVisible} setVisible={setModalVisible} />
    );

    return [ModalComponent, setModalVisible];
};

