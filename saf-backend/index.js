import express from "express"
import { filmesRouter } from "./routes/filmes.routes.js";
import { usuariosRouter } from "./routes/usuarios.routes.js";


const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.use(filmesRouter)
app.use(usuariosRouter)

app.listen(55555, () => {
    console.log("Servidor iniciado na porta 55555");
});