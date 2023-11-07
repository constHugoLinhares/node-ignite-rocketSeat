import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';


// CommonJS -> require
// ESModules -> import/export <- node não suporta \ type:modules

// - Criação de usuários
// - Listagem de usuários
// - Edição de usuários
// - Remoção de usuários

// - HTTP
//     - Método HTTP
//     - URL

// GET, POST, PUT, PATCH, DELETE

// GET => Buscar um recurso do back-end
// POST => Criar um recurso do back end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualiza um recurso específico de um recurso no back-end
// DELETE => Deletar um recurso no back-end

// GET /users => Buscando usuários do back-end
// POST /users => Criar um usuário no back-end

// Stateful (os dados são perdidos ao servidor ser reiniciado) - Stateless (bancos de dados, formas de armazenamento externo)

// JSON - JavaScript Object Notation

// Cabeçalhos (Requisição/resposta) => Metadados

/** HTTP Status Code
 *  Informational responses (100 - 199)
 *  Successful responses    (200 - 299)
 *  Redirection responses   (300 - 399)
 *  Client error responses  (400 - 499)
 *  Server error responses  (500 - 599)
 * */ 

const users = []

const server = http.createServer(async (req, res) => {
    const { method, url} = req

    await json(req, res)

    // console.log(body.name)

    const route = routes.find(route => {
        return route.method === method && route.path === url
    })

    if(route) {
        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not Found')
})

server.listen(3333);

// node --watch src/server.js