import { db } from "../database/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export {
    logarUsuario, adicionarUsuario, atualizarNome, atualizarSenha, deletarUsuario, obterAvaliacoes
}

const secret = '5uP3r-S3cR3t4!'

async function gerarToken(userid) {
    const consulta = await db.get('SELECT id, nome, email FROM usuarios WHERE id = ?', [userid])
    const playload = {
        userid: consulta.id,
        username: consulta.nome,
        useremail: consulta.email
    }
    const token = jwt.sign(playload, secret, {expiresIn: '30m'})
    return token;
}

function verificarToken(token) {
    try {
        const decode = jwt.verify(token, secret)
        return decode;
    } catch (error) {
        return null;
    }
}

async function logarUsuario(req, res) {
    const {usuario, senha} = req.body;
    const consulta = await db.get(`SELECT id, nome, email, senha FROM usuarios WHERE nome = ?`, [usuario]);

    if (consulta) {
        const valido = await bcrypt.compare(senha, consulta.senha)        
        
        if (valido) {
            const token = await gerarToken(consulta.id)
            return res.status(200).json({'token': token});
        } else {
            return res.status(401).json({ message: "Nome de usuário ou senha incorretos!" });
        }
    } else {
        return res.status(403).json({ message: "Esse usuário não existe!" });
    }
    
}

async function adicionarUsuario(req, res) {
    const {usuario, email, senha} = req.body;
    
    const salt = await bcrypt.genSalt(10)
    const hashSenha = await bcrypt.hash(senha, salt);

    const usuarioExistente = await db.get("SELECT * FROM usuarios WHERE nome = ? OR email = ?", [usuario, email]);
    if(usuarioExistente) {
        return res.status(409).json({ message: "Nome de usuário ou email já cadastrados." });
    }

    await db.run("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)", [usuario, email, hashSenha]);
    
    return res.status(201).json({ message: "Usuário criado com sucesso." })
}

async function atualizarNome(req, res) {
    const {token, novoNome, senha} = req.body;
    const decode = verificarToken(token)
    if (!decode) {
        return res.status(401).json({message: 'Seção expirada'})
    }

    const consulta = await db.get("SELECT id, nome, email, senha FROM usuarios WHERE id = ?", [decode.userid]);

    if(consulta) {
        const hashSenha = consulta.senha
        const valido = await bcrypt.compare(senha, hashSenha)

        if(valido) {
            const nomeExistente = await db.get("SELECT * FROM usuarios WHERE nome = ?", [novoNome])
            
            if(nomeExistente) {
                return res.status(409).json({ message: "Nome de usuário já cadastrado." });
            } else {
                await db.run("UPDATE usuarios SET nome = ? WHERE id = ?", [novoNome, decode.userid])

                const token = await gerarToken(consulta.id)
            
                return res.status(200).json({ "token": token, message: "Nome de usuário atualizado com sucesso" })
            }
        } else {
            return res.status(403).json({ message: "Senha inválida!"})
        }
    } else {
        return res.status(403).json({ message: "Usuário não encontrado"})
    }
}

async function atualizarSenha(req, res) {
    const {id, senhaAntiga, novaSenha} = req.body;

    const consulta = await db.get("SELECT senha FROM usuarios WHERE id = ?", [id])

    if(consulta) {
        const hashSenha = consulta.senha
        
        const valido = await bcrypt.compare(senhaAntiga, hashSenha)

        if(valido) {
            const salt = await bcrypt.genSalt(10)
            const senhaAtualizada = await bcrypt.hash(novaSenha, salt)

            await db.run("UPDATE usuarios SET senha = ? where id = ?", [senhaAtualizada, id])

            return res.status(200).json({ message: "Senha atualizada com sucesso" })
        }
    }
    return res.status(403).json({ message: "Senha inválida!"})
}

async function deletarUsuario(req, res) {
    const { id } = req.body;

    await db.run("DELETE FROM usuarios WHERE id = ?", [id])

    return res.status(202).json({ message: "Usuário deletado com sucesso." })
}

async function obterAvaliacoes(req, res) {
    const idUser = req.params.id

    const avaliacoes = await db.all("SELECT f.id, f.titulo, f.img, a.nota, a.comentario FROM avaliacoes as a INNER JOIN filmes as f ON a.id_filme = f.id WHERE a.id_usuario = ?", [idUser])

    if(avaliacoes.length) {
        return res.status(200).json(avaliacoes)
    } else {
        return res.status(204).json({ message: "Ainda não há avaliações"})
    }
}