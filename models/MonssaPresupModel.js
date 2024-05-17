export class MonssaPresupModel {

    constructor(presupuesto) {
        this.presup = {
            ...presupuesto.const,
            ...presupuesto.oper,
            ...presupuesto.customer.domicilio,
            ...presupuesto.customer.contacto,
            name: presupuesto.customer.name,
            ape: presupuesto.customer.ape,
        }
        this.abono = { ...presupuesto.abono }
        this.items = Object.values(presupuesto.items).map(item => ({
            faltante: item.faltante,
            generic_id: item.generic_id,
            observ: item.observ,
            precio: item.precio,
            presup_id: item.presup_id,
            qty: item.qty,
            qty_cajon: item.qty_cajon,
            sqty: item.sqty,
            user_id: item.user_id
        }))
    }
}