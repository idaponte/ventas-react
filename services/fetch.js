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
        const response = await fetch(this.getUrl(url), options);
        return await response.json();
    }

    async postData(url, data, options = {}) {

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

        const fromJson = await response.json();
        console.log(fromJson)
        return fromJson;
    }

    static async post(url, data, options = {}) {
        const fetch = new Fetch();
        return fetch.postData(url, data, options);
    }
}