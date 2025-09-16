import { db } from "./db.js";

const usuarios = [
  {
    nome: 'Machado de Assis',
    email: 'machadoAssis@gmail.com',
    senha: '$2b$10$3K3qgDqw31.SzviJFeoRFuEoVxDXofYMfYTp4XLT5H9spM5DOx0qq'
  },
  {
    nome: 'ana',
    email: 'hohenheim@gmail.com',
    senha: '$2b$10$44efASkQq/pfO0W3DRWOleOuySteXMyOWfGT3/8MbDVRTt5jUUf6G'
  },
  {
    nome: 'josebarros',
    email: 'zeBarros10@gmail.com',
    senha: '$2b$10$p1RoTGeer5DY/yMlUbF8Su7b2k0ULueLoQ5.W/Ifi7ktVbWcHYJUu'
  },
  {
    nome: 'avaliador',
    email: 'oAvaliador@gmail.com',
    senha: '$2b$10$78ptXhbHWJ6w9n.qLZ2wa.X1Qa6NF0kwQHZMKqFkKg68/PfibrU12'
  },
  {
    nome: 'ninja',
    email: 'ninja119@gmail.com',
    senha: '$2b$10$wLJXoABSHht2B/BEbziO1uzxi78ab.5N6CxhJe1N6KrrKk6BTEQV.'
  },
  {
    nome: 'estevao123',
    email: 'estevao@email.com',
    senha: '$2b$10$7gI4Ov7LlKLeDWl0dGsD2O7Bb7jrz0PiT9aHtkLCM.uvz0Cx1hyGa'
  },
  {
    nome: 'juazeiro',
    email: 'juazeiro@gmail.com',
    senha: '$2b$10$Huccz0GudgmKVsoo0G7/F.MxmdYRDo8DKGl0iqCxKJhEw0EFRyvhq'
  },
  {
    nome: 'pereira',
    email: 'oPereira@gmail.com',
    senha: '$2b$10$VWNgAf1z5M87P.OhEJZpLOdjnNYda96DMXDa2gy7jXtCa5ou06Ucm'
  },
  {
    nome: 'critico',
    email: 'critico@gmail.com',
    senha: '$2b$10$gP1wScBGSxnvVH5SFETXluB4XJRBkgpjSYbprZyng/tFPqfSx4ca6'
  },
  {
    nome: 'Emilly',
    email: 'emilly@gmail.com',
    senha: '$2b$10$qgV8RTtQ77vjeFuNOKwOoOdJh1uLc69ktkYGVMMIatxbT6caiSi6S'
  },
  {
    nome: 'jose',
    email: 'jose@email.com',
    senha: '$2b$10$GtQMVfTdHuf6b93zaRnCzuuDv1FihDKD4BdbyzCsj/NQWL.OhKmOq'
  },
  {
    nome: 'maria',
    email: 'maria@gmail.com',
    senha: '$2b$10$W32lWLKbkD5d81OpQDcCsulvADEalCHekyLgcAfm1ELwkMiv6X/ye'
  },
  {
    nome: 'carlos',
    email: 'carlos@orkut.net',
    senha: '$2b$10$/B.lLd1OK3n4xjSeQ6.xK.vNQEPyDi7SN96FxMNohTf5LYgFz.lou'
  },
]

for (const usuario of usuarios) {
  await db.run(`INSERT INTO usuarios (nome, email, senha) VALUES(?, ?, ?)`, [usuario.nome, usuario.email, usuario.senha])
}
console.log('usuarios inserirdos');
