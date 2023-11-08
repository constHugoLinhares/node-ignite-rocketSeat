import http from 'node:http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

// Query Parameters: URL Stateful => Filtros, paginação, não-obrigatórios
// Route Parameters: Identificação de recurso
// Request Body: Envio de informações de um formulário (HTTPs)

// http://localhost:3333/users?userId=1&name=Hugo

// GET http://localhost:3333/users/1
// DELETE http://localhost:3333/users/1

// POST http://localhost:3333/users

// Edição e remoção


const users = []

const server = http.createServer(async (req, res) => {
    const { method, url} = req

    await json(req, res)

    // console.log(body.name)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if(route) {
        const routeParams = req.url.match(route.path);
        
        console.log(routeParams)

        return route.handler(req, res)
    }

    return res.writeHead(404).end('Not Found')
})

server.listen(3333);

// node --watch src/server.js