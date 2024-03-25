import { describe, expect, it } from 'vitest';
import { RegisterUseCase } from './register';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory-users-repository';
import { UserAlreadyExistsError } from './errors/user-already-exists-error';

describe('Register Use Case', () => {
	it('Should be possible to register', async() => {
		const usersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);

		const { user } = await registerUseCase.handle({
			name: 'Hugo',
			email: 'rockerhugo@gmail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('Should hash user password upon registration', async() => {
		const usersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);

		const { user } = await registerUseCase.handle({
			name: 'Hugo',
			email: 'rockerhugo@gmail.com',
			password: '123456',
		});

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.password_hash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('Should unable to register with same email twice', async() => {
		const usersRepository = new InMemoryUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);

		const email = 'test@gmail.com';

		await registerUseCase.handle({
			name: 'Hugo',
			email,
			password: '123456',
		});

		expect(() => 
			registerUseCase.handle({
				name: 'Hugo',
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});
});