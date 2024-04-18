

export const getData = async () => {
    const endpoints = [
        'bonifs',
        'meses',
        'tipoinstalaciones',
        'rubros',
        'dolar',
        'precios',
    ]

    const data = await Promise.all(
        endpoints.map(async endpoint => {
            const response = await Fetch.get('api/' + endpoint)
            return { [endpoint]: response }
        })
    )

    console.log(data)

}
