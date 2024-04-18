import * as SecureStore from 'expo-secure-store';

export class SecureStorage {

    static setData = async (key, value) => {
        try {
            console.log('Setting data:', key, value)

            await SecureStore.setItemAsync(key, value);
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static getData = async (key) => {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }
}
