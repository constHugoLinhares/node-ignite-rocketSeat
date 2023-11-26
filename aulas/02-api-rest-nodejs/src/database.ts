import { knex as setupKnex, Knex } from 'knex'
import 'dotenv/config'

<<<<<<< HEAD
if(!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL env Not Found!')
=======
if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE env Not Found!')
>>>>>>> 33597ca093ba6f135c8df2e931db58a5cadb0035
}

export const config: Knex.Config = {
    client: 'sqlite',
    connection: {
        filename: process.env.DATABASE_URL
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './database/migrations',
    }
}

export const knex = setupKnex(config)