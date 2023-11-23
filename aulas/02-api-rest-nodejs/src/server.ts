import fastify from 'fastify'
import { knex } from './database'

const app = fastify()

// GET, POST, PUT, PATCH, DELETE

app.get('/hello', async () => {
  // const transactions = await knex('transactions')
  // .where('amount', 1000)
  // .select('*')

  const transactions = await knex('transactions').insert({
    id: crypto.randomUUID(),
    title: 'Transação de teste',
    amount: 1000
  }).returning('*')

  return transactions
})

app
  .listen({
    port: 3333
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
