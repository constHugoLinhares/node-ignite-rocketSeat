import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository';
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error';
import { RegisterUseCase } from '@/use-cases/register';

export async function register(request:FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		name: z.string(), 
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { name,email,password } = registerBodySchema.parse(request.body);

	try {
		const usersRepository = new PrismaUsersRepository();
		const registerUseCase = new RegisterUseCase(usersRepository);

		await registerUseCase.handle({
			name,
			email,
			password,
		});
	} catch (error) {
		console.log('error');
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(201).send();
}