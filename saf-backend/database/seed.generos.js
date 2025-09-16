import {db} from "./db.js"

const generos = [
    "Ação",
    "Animação",
    "Aventura",
    "Comédia",
    "Crime",
    "Drama",
    "Documentário",
    "Fantasia",
    "Faroeste",
    "Ficção Científica",
    "Musical",
    "Romance",
    "Suspense",
    "Terror",
]

for(const genero of generos) {
    await db.run(`INSERT INTO generos (nome) VALUES(?)`, [genero])
}

console.log('generos inseridos');
