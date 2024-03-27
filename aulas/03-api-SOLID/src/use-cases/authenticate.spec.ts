import { describe, expect, it } from 'vitest';
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository';
import { AuthenticateUseCase } from './authenticate';
import { hash } from 'bcryptjs';
import { InvalidCredentialsError } from './errors/invalid-credentials-error';

describe('Authenticate Use Case', () => {
	it('Should be possible to authenticate', async() => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await usersRepository.create({
			name: 'hugo',
			email: 'rockerhugo@gmail.com',
			password_hash: await hash('123456', 6),
		});

		const { user } = await sut.handle({
			email: 'rockerhugo@gmail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should unable to authenticate with wrong email', async() => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		expect(() => 
			sut.handle({
				email: 'rockerhugo@gmail.com',
				password: '123456',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it('Should unable to authenticate with wrong email', async() => {
		const usersRepository = new InMemoryUsersRepository();
		const sut = new AuthenticateUseCase(usersRepository);

		await usersRepository.create({
			name: 'hugo',
			email: 'rockerhugo@gmail.com',
			password_hash: await hash('123456', 6),
		});

		expect(() => 
			sut.handle({
				email: 'rockerhugo@gmail.com',
				password: '111 111',
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});