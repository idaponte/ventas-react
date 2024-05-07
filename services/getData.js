import { Fetch } from "./fetch"


export const getData = async () => {
    console.log('getData')

    const endpoints = {
        'rubros': 'rubros',
        'bonifs': 'bonifs',
        'meses': 'meses',
        'tipoAbono': 'tipoinstalaciones',
        'dolar': 'dolar',
        'items': 'precios',
    }


    const data = await Promise.all(
        Object.keys(endpoints).map(async key => {
            const response = await Fetch.get('api/' + endpoints[key])
            return { [key]: response['data'] }
        })
    )

    const finalData = data.reduce((acc, item) => {
        return { ...acc, ...item }
    }, {})

    return finalData
}
