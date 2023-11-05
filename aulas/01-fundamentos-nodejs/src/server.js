import http from 'node:http';

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

const server = http.createServer((req, res) => {
    const { method, url} = req

    if(method === 'GET' && url === '/users')
        return res.end('Listagem de usuários'); // http POST localhost:3333/users

    if(method === 'POST' && url === '/users')
        return res.end('Criação de usuário'); // http GET localhost:3333/users

    return res.end('Hello World')
})

server.listen(3333);

// node --watch src/server.js