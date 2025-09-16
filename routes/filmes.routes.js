import { Router } from 'express'
import { obterLancamentos, obterRaking, obterFilme, obterCategoria, avaliarFilme, buscarFilmes, obterComentarios } from '../controllers/filmes.controllers.js'

export const filmesRouter = Router();

filmesRouter.get("/api/filmes/lancamentos", obterLancamentos);

filmesRouter.get("/api/filmes/ranking", obterRaking)

filmesRouter.get("/api/filmes/categoria/:categoria", obterCategoria)

filmesRouter.get("/api/filmes/busca/:titulo", buscarFilmes)

filmesRouter.get("/api/filme/comentarios/:id", obterComentarios)

filmesRouter.get("/api/filme/:id", obterFilme);

filmesRouter.post("/api/filme/avalia", avaliarFilme)