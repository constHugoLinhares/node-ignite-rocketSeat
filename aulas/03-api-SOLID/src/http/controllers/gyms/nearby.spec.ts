import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '@/app';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gyms (e2e)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('Should be possible to list nearby gyms', async () => {
		const { token } = await createAndAuthenticateUser(app);

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'JavaScript Gym',
				description: 'Some description',
				phone: '12999345566',
				latitude: -22.8328134,
				longitude: -47.9288782,
			});

		await request(app.server)
			.post('/gyms')
			.set('Authorization', `Bearer ${token}`)
			.send({
				title: 'Typescript Gym',
				description: 'Some description',
				phone: '12999345566',
				latitude: -22.792693300294406,
				longitude: -47.76442371735295,
			});

		const response = await request(app.server)
			.get('/gyms/nearby')
			.query({
				latitude: -22.8328134,
				longitude: -47.9288782,
			})
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(response.statusCode).toEqual(200);
		expect(response.body.gyms).toHaveLength(1);
		expect(response.body.gyms).toEqual([
			expect.objectContaining({ title: 'JavaScript Gym' }),
		]);
	});
});
