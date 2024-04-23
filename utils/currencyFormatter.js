const priceFormatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
})

export const formatPrice = (price = 0) => priceFormatter.format(price)