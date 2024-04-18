import { Fetch } from "./fetch"


export const getData = async () => {
    const endpoints = [
        'rubros',
        'bonifs',
        'meses',
        'tipoinstalaciones',
        'dolar',
        'precios',
    ]

    const data = await Promise.all(
        endpoints.map(async endpoint => {
            const response = await Fetch.get('api/' + endpoint)
            return { [endpoint]: response['data'] }
        })
    )

    const finalData = data.reduce((acc, item) => {
        return { ...acc, ...item }
    }, {})

    return finalData
}
