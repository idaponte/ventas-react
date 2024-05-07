export const getDom = (d) => {
    var domi = "";
    domi += d.calle != "" && d.calle != null ? d.calle : "";
    domi +=
        d.nro != "" && d.nro != null && d.nro.search(/^s.n/i) == -1
            ? " N° " + d.nro
            : " s/n ";
    if (d.entre != "" && d.entre != null) {
        if (d.entre.search(/^esq/i) != -1) {
            domi += " " + d.entre;
        } else {
            domi += " e/" + d.entre;
        }
    }
    domi +=
        d.piso != "" && d.piso != null && d.piso != "s/n" ? " Piso: " + d.piso : "";
    domi +=
        d.ofi != "" && d.ofi != null && d.ofi != "s/n" ? " Ofi/Dpto: " + d.ofi : "";
    if (!d.nro) {
        domi += "";
    }
    return domi;
};