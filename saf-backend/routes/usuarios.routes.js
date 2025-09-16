import { Router } from "express";
import { logarUsuario, adicionarUsuario, atualizarNome, atualizarSenha, deletarUsuario, obterAvaliacoes } from "../controllers/usuarios.controlles.js";

export const usuariosRouter = Router();

usuariosRouter.post('/api/usuario/logar', logarUsuario)

usuariosRouter.post('/api/usuario/adicionar', adicionarUsuario)

usuariosRouter.delete("/api/usuario/delete", deletarUsuario)

usuariosRouter.patch('/api/usuario/atualizar/nome', atualizarNome)

usuariosRouter.patch("/api/usuario/atualizar/senha", atualizarSenha)

usuariosRouter.get("/api/usuario/avaliacoes/:id", obterAvaliacoes)