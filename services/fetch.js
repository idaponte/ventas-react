import { SecureStorage, saveToSecureStorage } from "../utils/secureStorage";

export class Fetch {
    devMode = true;
    devUrl = 'http://10.0.2.2:8000/';
    prodUrl = 'https://ventas.monssa.com.ar/';

    getUrl(url) {
        const finalUrl = this.devMode ? this.devUrl + url : this.prodUrl + url;
        console.log('URL:', finalUrl);
        return finalUrl;
    }


    static async get(url, options = {}) {
        const fetch = new Fetch();
        return fetch.fetchData(url, options);
    }

    async fetchData(url, options = {}) {
        try {
            const response = await fetch(this.getUrl(url), {
                method: 'GET',
                credentials: 'same-origin',
                ...options
            });

            const fromJson = await response.json();

            if (fromJson['ed'] !== undefined && fromJson['ed'].toLowerCase() !== 'ok') {
                throw new Error(fromJson['ed']);
            }


            return {
                status: 200,
                data: fromJson['result']
            };

        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    async postData(url, data, options = {}) {

        try {
            const formData = new FormData();

            for (const key in data) {
                formData.append(key, data[key]);
            }


            const response = await fetch(this.getUrl(url), {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData,
                ...options
            });

            const extranetCookie = response.headers.get('set-cookie').split(';')[0];
            await SecureStorage.setData('extranet', extranetCookie);

            const fromJson = await response.json();

            if (fromJson['ed'] !== undefined && fromJson['ed'].toLowerCase() !== 'ok') {
                throw new Error(fromJson['ed']);
            }

            return {
                status: 200,
                data: fromJson
            };
        } catch (error) {
            console.error(error.message);
            throw new Error(error.message);
        }
    }

    static async post(url, data, options = {}) {
        const fetch = new Fetch();
        return fetch.postData(url, data, options);
    }
}