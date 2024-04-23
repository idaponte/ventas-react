export function quitarTildes(palabra) {
    // Define un objeto con los caracteres acentuados y sus equivalentes sin acento
    var acentos = {
        'á': 'a',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ú': 'u',
        'Á': 'A',
        'É': 'E',
        'Í': 'I',
        'Ó': 'O',
        'Ú': 'U',
        'ü': 'u',
        'Ü': 'U',
        'ñ': 'n',
        'Ñ': 'N'
    };

    // Utiliza una expresión regular para buscar los caracteres acentuados y reemplazarlos con sus equivalentes
    return palabra.replace(/[áéíóúÁÉÍÓÚüÜñÑ]/g, function (match) {
        return acentos[match];
    });
}