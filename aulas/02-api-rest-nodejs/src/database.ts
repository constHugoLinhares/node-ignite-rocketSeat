import { knex as setupKnex, Knex } from 'knex'
import { env } from './env'
console.log(env.DATABASE_CLIENT)

export const config: Knex.Config = {
    client: env.DATABASE_CLIENT,
    connection: env.DATABASE_CLIENT === 'sqlite' 
    ? {
        filename: env.DATABASE_URL
    } : {
        host: 'dpg-clrgojpjvg7s73egmv4g-a',
        user: 'ignite_nodejs_02_db_ifjn_user',
        password: 'KTsKOuHPlHFZcjJvke6OyBojQ8rrpJZa',
        database: env.DATABASE_URL,
        port:5432,
    },
    useNullAsDefault: true,
    migrations: {
        extension: 'ts',
        directory: './database/migrations',
    }
}

export const knex = setupKnex(config)