// Arreglo de nombres
const nombres = [
    "Carlos",
    "María",
    "José",
    "Ana",
    "Luis",
    "Carmen",
    "Jorge",
    "Laura",
    "Pedro",
    "Lucía",
    "Manuel",
    "Elena",
    "Fernando",
    "Sofía",
    "Miguel",
    "Isabel",
    "Juan",
    "Patricia",
    "Andrés",
    "Marta"
];

export const getRandomName = () => {
    const randomIndex = Math.floor(Math.random() * nombres.length);
    return nombres[randomIndex];
};

// Arreglo de apellidos
const apellidos = [
    "García",
    "Martínez",
    "López",
    "Hernández",
    "González",
    "Rodríguez",
    "Pérez",
    "Sánchez",
    "Ramírez",
    "Torres",
    "Flores",
    "Rivera",
    "Gómez",
    "Díaz",
    "Moreno",
    "Alvarez",
    "Ruiz",
    "Vargas",
    "Ortiz",
    "Silva"
];

export const getRandomLastName = () => {
    const randomIndex = Math.floor(Math.random() * apellidos.length);
    return apellidos[randomIndex];
}
