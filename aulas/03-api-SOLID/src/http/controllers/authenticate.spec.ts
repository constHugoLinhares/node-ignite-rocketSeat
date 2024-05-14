import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';

describe('Authenticate (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be able to authenticate', async () => {
		const response = await request(app.server)
			.post('/users')
			.send({
				name: 'Hugo',
				email: 'rockerhugo@gmail.com',
				password: '123456',
			});

		expect(response.statusCode).toEqual(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
