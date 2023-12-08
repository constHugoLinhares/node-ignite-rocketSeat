import { expect, it, beforeAll, afterAll, describe } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'

describe('Transaction Routes', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to create a new transaction', async () => {
        const response = await request(app.server)
            .post('/transactions')
            .send(
                {
                    title: 'New transaction',
                    amount: 5000,
                    type: 'credit',
                }
            )
            .expect(201)
    })

    it('should be able to list all transactions', async () => {
        const createTransactionResponse = await request(app.server)
            .post('/transactions')
            .send(
                {
                    title: 'New transaction',
                    amount: 5000,
                    type: 'credit',
                }
            )

        const cookies = createTransactionResponse.get('Set-Cookie')

        const listTransactionsResponse = await request(app.server)
            .get('/transactions')
            .set('Cookie', cookies)
            .expect(200)

        expect(listTransactionsResponse.body.transactions).toEqual([
            expect.objectContaining({
                title: 'New transaction',
                amount: 5000,
            })
        ])
    })
})