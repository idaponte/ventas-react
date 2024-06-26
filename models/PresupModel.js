

import { presupMockup, getYYYYMMDD } from "../utils";


export class PresupuestoModel {

    constructor(data) {

        if (data === undefined) {
            const mockup = presupMockup;
            this.const = new ConstModel(
                mockup.const.account_id,
                mockup.const.ainsta,
                mockup.const.atendido_por,
                mockup.const.call_id,
                mockup.const.cierre,
                mockup.const.closeobserv,
                mockup.const.customer_id,
                mockup.const.en_not_observ,
                mockup.const.explic_observ,
                mockup.const.killobserv,
                mockup.const.muerto,
                mockup.const.rebote,
                mockup.const.reboteobserv,
                mockup.const.suspobs,
                mockup.const.whoainsta,
                mockup.const.whoclose,
                mockup.const.whocreado,
                mockup.const.whokill,
                mockup.const.whorebote
            )

            this.customer = new CustomerModel(
                mockup.customer.name,
                mockup.customer.ape,
                new DomicilioModel(
                    mockup.customer.domicilio.calle,
                    mockup.customer.domicilio.ciudad,
                    mockup.customer.domicilio.cp,
                    mockup.customer.domicilio.entre,
                    mockup.customer.domicilio.lat,
                    mockup.customer.domicilio.lon,
                    mockup.customer.domicilio.nro,
                    mockup.customer.domicilio.ofi,
                    mockup.customer.domicilio.piso
                ),
                new ContactoModel(
                    mockup.customer.contacto.email,
                    mockup.customer.contacto.cel_car,
                    mockup.customer.contacto.cel_nbr,
                    mockup.customer.contacto.cel_pre,
                    mockup.customer.contacto.tel_car,
                    mockup.customer.contacto.tel_nbr,
                    mockup.customer.contacto.tel_pre,
                    mockup.customer.contacto.fax_car,
                    mockup.customer.contacto.fax_nbr,
                    mockup.customer.contacto.fax_pre
                )
            )

            this.oper = new OperModel(
                mockup.oper.categoria,
                mockup.oper.creado || getYYYYMMDD(),
                mockup.oper.formapago,
                mockup.oper.insta_id,
                mockup.oper.intobserv,
                mockup.oper.intobserv_new,
                mockup.oper.modo_facturacion,
                mockup.oper.observ,
                OperModel.getRandomId(),
                mockup.oper.prior,
                mockup.oper.reboteobserv,
                mockup.oper.rubro_id,
                mockup.oper.signature,
                mockup.oper.status, // TODO:
            )

            this.abono = new AbonoModel(
                mockup.abono.presup_id,
                mockup.abono.abono,
                mockup.abono.insta,
                mockup.abono.bonifp,
                mockup.abono.bonifd,
                mockup.abono.dolar,
                mockup.abono.bonifp_perc,
                mockup.abono.bonif_abono,
                mockup.abono.bonif_meses,
                mockup.abono.materiales
            )

            this.items = {}
            return
        }

        const presup = data.presup;
        const abono = data.abono;

        this.const = new ConstModel(
            presup?.account_id,
            presup?.ainsta,
            presup?.atendido_por,
            presup?.call_id,
            presup?.cierre,
            presup?.closeobserv,
            presup?.customer_id,
            presup?.en_not_observ,
            presup?.explic_observ,
            presup?.killobserv,
            presup?.muerto,
            presup?.rebote,
            presup?.reboteobserv,
            presup?.suspobs,
            presup?.whoainsta,
            presup?.whoclose,
            presup?.whocreado,
            presup?.whokill,
            presup?.whorebote
        )

        this.customer = new CustomerModel(
            presup?.name,
            presup?.ape,
            new DomicilioModel(
                presup?.calle,
                presup?.ciudad,
                presup?.cp,
                presup?.entre,
                presup?.lat,
                presup?.lon,
                presup?.nro,
                presup?.ofi,
                presup?.piso
            ),
            new ContactoModel(
                presup?.email,
                presup?.cel_car,
                presup?.cel_nbr,
                presup?.cel_pre,
                presup?.tel_car,
                presup?.tel_nbr,
                presup?.tel_pre,
                presup?.fax_car,
                presup?.fax_nbr,
                presup?.fax_pre
            )
        )

        this.oper = new OperModel(
            presup?.categoria,
            presup?.creado,
            presup?.formapago,
            presup?.insta_id,
            presup?.intobserv,
            presup?.intobserv_new,
            presup?.modo_facturacion,
            presup?.observ,
            presup?.presup_id,
            presup?.prior,
            presup?.reboteobserv,
            presup?.rubro_id,
            presup?.signature,
            presup?.status, // TODO: setear valores posibles
            presup?.tecobserv,
            presup?.tipo_cond_pago,
            presup?.tipo_pago,
            presup?.vend_id
        )

        this.abono = new AbonoModel(
            abono?.presup_id,
            abono?.abono,
            abono?.insta,
            abono?.bonifp,
            abono?.bonifd,
            abono?.dolar,
            abono?.bonifp_perc,
            abono?.bonif_abono,
            abono?.bonif_meses,
            abono?.materiales
        )

        const rawItems = data?.items || [];

        this.items = {};

        for (const item of rawItems) {
            this.items[item.generic_id] = new ItemModel(
                item.presup_id,
                item.generic_id,
                item.observ,
                item.user_id,
                item.qty,
                item.precio,
                item.faltante,
                item.sqty,
                item.qty_cajon,
            )

        }
    }

    addItem(item) {
        this.items = {
            ...this.items,
            [item.generic_id]: item
        };
    }



    static fromMockup() {
        return new PresupuestoModel();
    }


    static fromJson(json) {
        return new PresupuestoModel(
            json.presup,
            json.abono,
            json.items
        );
    }

    static fromMap(map) {
        return new PresupuestoModel(
            map.presup,
            map.abono,
            map.items
        );
    }


    static getPresupMockup() {
        return presupMockup;
    }
}

export class CustomerModel {
    constructor(name, ape, domicilio, contacto) {
        this.name = name || presupMockup.customer.name;
        this.ape = ape || presupMockup.customer.ape;
        this.domicilio = domicilio;
        this.contacto = contacto;
    }
}

export class DomicilioModel {
    constructor(calle, ciudad, cp, entre, lat, lon, nro, ofi, piso) {
        this.calle = calle || presupMockup.customer.domicilio.calle;
        this.ciudad = ciudad || presupMockup.customer.domicilio.ciudad;
        this.cp = cp || presupMockup.customer.domicilio.cp;
        this.entre = entre || presupMockup.customer.domicilio.entre;
        this.lat = lat || presupMockup.customer.domicilio.lat;
        this.lon = lon || presupMockup.customer.domicilio.lon;
        this.nro = nro || presupMockup.customer.domicilio.nro;
        this.ofi = ofi || presupMockup.customer.domicilio.ofi;
        this.piso = piso || presupMockup.customer.domicilio.piso;
    }

    static getDom(data) {
        var domi = "";
        domi += data.calle != "" && data.calle != null ? data.calle : "";
        domi +=
            data.nro != "" && data.nro != null && data.nro.search(/^s.n/i) == -1
                ? " N° " + data.nro
                : " s/n ";
        if (data.entre != "" && data.entre != null) {
            if (data.entre.search(/^esq/i) != -1) {
                domi += " " + data.entre;
            } else {
                domi += " e/" + data.entre;
            }
        }
        domi +=
            data.piso != "" && data.piso != null && data.piso != "s/n" ? " Piso: " + data.piso : "";
        domi +=
            data.ofi != "" && data.ofi != null && data.ofi != "s/n" ? " Ofi/Dpto: " + data.ofi : "";
        if (!data.nro) {
            domi += "";
        }
        return domi;
    };

    getDom() {
        var domi = "";
        domi += this.calle != "" && this.calle != null ? this.calle : "";
        domi +=
            this.nro != "" && this.nro != null && this.nro.search(/^s.n/i) == -1
                ? " N° " + this.nro
                : " s/n ";
        if (this.entre != "" && this.entre != null) {
            if (this.entre.search(/^esq/i) != -1) {
                domi += " " + this.entre;
            } else {
                domi += " e/" + this.entre;
            }
        }
        domi +=
            this.piso != "" && this.piso != null && this.piso != "s/n" ? " Piso: " + this.piso : "";
        domi +=
            this.ofi != "" && this.ofi != null && this.ofi != "s/n" ? " Ofi/Dpto: " + this.ofi : "";
        if (!this.nro) {
            domi += "";
        }
        return domi;
    };
}

export class ContactoModel {
    constructor(email, cel_car, cel_nbr, cel_pre, tel_car, tel_nbr, tel_pre, fax_car, fax_nbr, fax_pre) {
        this.email = email || presupMockup.customer.contacto.email;
        this.cel_car = cel_car || presupMockup.customer.contacto.cel_car;
        this.cel_nbr = cel_nbr || presupMockup.customer.contacto.cel_nbr;
        this.cel_pre = cel_pre || presupMockup.customer.contacto.cel_pre;
        this.tel_car = tel_car || presupMockup.customer.contacto.tel_car;
        this.tel_nbr = tel_nbr || presupMockup.customer.contacto.tel_nbr;
        this.tel_pre = tel_pre || presupMockup.customer.contacto.tel_pre;
        this.fax_car = fax_car || presupMockup.customer.contacto.fax_car;
        this.fax_nbr = fax_nbr || presupMockup.customer.contacto.fax_nbr;
        this.fax_pre = fax_pre || presupMockup.customer.contacto.fax_pre;
    }
}

export class OperModel {
    constructor(categoria, creado, formapago, insta_id, intobserv, intobserv_new, modo_facturacion, observ, presup_id, prior, reboteobserv, rubro_id, signature, status, tecobserv, tipo_cond_pago, tipo_pago, vend_id) {
        this.categoria = categoria || presupMockup.oper.categoria;
        this.creado = creado || getYYYYMMDD();
        this.formapago = formapago || presupMockup.oper.formapago;
        this.insta_id = insta_id || presupMockup.oper.insta_id;
        this.intobserv = intobserv || presupMockup.oper.intobserv;
        this.intobserv_new = intobserv_new || presupMockup.oper.intobserv_new;
        this.modo_facturacion = modo_facturacion || presupMockup.oper.modo_facturacion;
        this.observ = observ || presupMockup.oper.observ;
        this.presup_id = presup_id || OperModel.getRandomId();
        this.prior = prior || presupMockup.oper.prior;
        this.reboteobserv = reboteobserv || presupMockup.oper.reboteobserv;
        this.rubro_id = rubro_id || presupMockup.oper.rubro_id;
        this.signature = signature || presupMockup.oper.signature;
        this.status = status || presupMockup.oper.status;
        this.tecobserv = tecobserv || presupMockup.oper.tecobserv;
        this.tipo_cond_pago = tipo_cond_pago || presupMockup.oper.tipo_cond_pago;
        this.tipo_pago = tipo_pago || presupMockup.oper.tipo_pago;
        this.vend_id = vend_id || presupMockup.oper.vend_id;
    }

    static getRandomId() {
        return Math.random().toString(36).substr(2, 6);
    }
}

export class ConstModel {
    constructor(account_id, ainsta, atendido_por, call_id, cierre, closeobserv, customer_id, en_not_observ, explic_observ, killobserv, muerto, rebote, reboteobserv, suspobs, whoainsta, whoclose, whocreado, whokill, whorebote) {

        this.account_id = account_id || presupMockup.const.account_id;
        this.ainsta = ainsta || presupMockup.const.ainsta;
        this.atendido_por = atendido_por || presupMockup.const.atendido_por;
        this.call_id = call_id || presupMockup.const.call_id;
        this.cierre = cierre || presupMockup.const.cierre;
        this.closeobserv = closeobserv || presupMockup.const.closeobserv;
        this.customer_id = customer_id || presupMockup.const.customer_id;
        this.en_not_observ = en_not_observ || presupMockup.const.en_not_observ;
        this.explic_observ = explic_observ || presupMockup.const.explic_observ;
        this.killobserv = killobserv || presupMockup.const.killobserv;
        this.muerto = muerto || presupMockup.const.muerto;
        this.rebote = rebote || presupMockup.const.rebote;
        this.reboteobserv = reboteobserv || presupMockup.const.reboteobserv;
        this.suspobs = suspobs || presupMockup.const.suspobs;
        this.whoainsta = whoainsta || presupMockup.const.whoainsta;
        this.whoclose = whoclose || presupMockup.const.whoclose;
        this.whocreado = whocreado || presupMockup.const.whocreado;
        this.whokill = whokill || presupMockup.const.whokill;
        this.whorebote = whorebote || presupMockup.const.whorebote;
    }
}

export class AbonoModel {
    constructor(presup_id, abono, insta, bonifp, bonifd, dolar, bonifp_perc, bonif_abono, bonif_meses, materiales) {
        this.presup_id = presup_id || presupMockup.abono.presup_id;
        this.abono = abono || presupMockup.abono.abono;
        this.insta = insta || presupMockup.abono.insta;
        this.bonifp = bonifp || presupMockup.abono.bonifp;
        this.bonifd = bonifd || presupMockup.abono.bonifd;
        this.dolar = dolar || presupMockup.abono.dolar;
        this.bonifp_perc = bonifp_perc || presupMockup.abono.bonifp_perc;
        this.bonifpPercAux = (bonifp_perc || presupMockup.abono.bonifpPercAux) * 100;
        this.bonif_abono = bonif_abono || presupMockup.abono.bonif_abono;
        this.bonif_meses = bonif_meses || presupMockup.abono.bonif_meses;
        this.materiales = materiales || presupMockup.abono.materiales;
    }

}

export class ItemModel {
    constructor(presup_id, generic_id, observ, user_id, qty, precio, faltante, sqty, qty_cajon) {
        let parsedPrecio = Number(precio);
        if (isNaN(parsedPrecio)) parsedPrecio = 0;


        this.presup_id = presup_id;
        this.generic_id = generic_id;
        this.observ = observ;
        this.user_id = user_id;
        this.qty = qty;
        this.precio = parsedPrecio;
        this.faltante = faltante;
        this.sqty = sqty;
        this.qty_cajon = qty_cajon;
    }
}