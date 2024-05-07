export const presupValidator = ({ presupCtx }) => {
    const { presupuesto: presup } = presupCtx

    const errors = []

    if (!presup.customer.name) errors.push('El nombre es requerido')
    else if (presup.customer.name.length > 50) errors.push('El nombre no puede tener más de 50 caracteres')

    if (!presup.customer.ape) errors.push('El apellido es requerido')
    else if (presup.customer.ape.length > 50) errors.push('El apellido no puede tener más de 50 caracteres')

    if (!presup.customer.domicilio.ciudad) errors.push('La ciudad es requerida')
    if (!presup.customer.domicilio.cp) errors.push('El código postal es requerido')


    if (!presup.customer.domicilio.nro && !presup.customer.domicilio.entre)
        errors.push('Debe ingresar el número de puerta o las entre calles')


    if (!presup.abono.bonifpPerc) errors.push('El porcentaje de bonificación es requerido')


    const arr = [1, 24, 2, 285, 144, 9, 131, 64, 3, 207, 196, 283, 8, 209, 204, 49]
    for (const item of presup.items) {
        if (arr.includes(item.generic_id)) continue
        const observ = item.observ ?? ''
        if (!observ.length) {
            errors.push(`Faltan comentarios en los items`)
            break
        }
    }



    const esAbonoInalambrico = presupCtx.abonoInalambrico
    const esInstaComun = presup.oper.categoria === 'insta. común'
    const comunicador = presupCtx.hasPresupComunicador()

    if (esAbonoInalambrico && esInstaComun && (!comunicador || comunicador.qty === 0)) errors.push('Debe agregar un comunicador al presupuesto')

    return errors
}