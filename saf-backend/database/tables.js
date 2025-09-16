import {db} from "./db.js"

async function criarTabelas() {
    await db.run(`
        CREATE TABLE IF NOT EXISTS filmes (
                id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                img TEXT,
                direcao TEXT NOT NULL,
                sinopse TEXT NOT NULL,
                nota REAL DEFAULT 0,
                qt_avaliacoes INTEGER DEFAULT 0,
                data_adicao TEXT
        );
    `);
    await db.run(`
        CREATE TABLE IF NOT EXISTS generos (
                nome TEXT NOT NULL PRIMARY KEY
        );
    `);
    await db.run(`
        CREATE TABLE IF NOT EXISTS genero_filme (
                idfilme INTEGER NOT NULL,
                nomegenero TEXT NOT NULL,
                CONSTRAINT idfilme_filmes_fk
                    FOREIGN KEY (idfilme)
                    REFERENCES filmes(id)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT nomegenero_generos_fk
                    FOREIGN KEY (nomegenero)
                    REFERENCES generos(nome)
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
        );
    `);
    await db.run(`
        CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            senha TEXT NOT NULL
        );
    `);
    await db.run(`
        CREATE TABLE IF NOT EXISTS avaliacoes (
            id_filme INTEGER NOT NULL,
            id_usuario INTEGER NOT NULL,
            nota INTEGER NOT NULL,
            comentario TEXT,
            PRIMARY KEY (id_filme, id_usuario)
            CONSTRAINT id_filme_filmes_fk
                FOREIGN KEY (id_filme)
                REFERENCES filmes(id)
                ON UPDATE CASCADE
                ON DELETE RESTRICT,
            CONSTRAINT id_usuario_usuarios_fk
                FOREIGN KEY (id_usuario)
                REFERENCES usuarios(id)
                ON UPDATE CASCADE
                ON DELETE CASCADE
        );
    `);
}

await criarTabelas();
console.log("Tabelas criadas");