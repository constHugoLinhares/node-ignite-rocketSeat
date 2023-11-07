import { randomUUID } from 'node:crypto'; // UUID => Unique Universal ID
import { Database } from './database.js';

const database = new Database

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')


            return res
            .setHeader('Content-type', 'application/json')
            .end(JSON.stringify(users)); // http POST localhost:3333/users
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const  { name, email } = req.body

            const user ={
                id: randomUUID(),
                name,
                email
            }
    
            database.insert('users', user)
    
            return res.writeHead(201).end(); // http GET localhost:3333/users
        }
    },
    {
        method: 'DELETE',
        path: '/users',
        handler: (req, res) => {
            return res.end()
        }
    }
]