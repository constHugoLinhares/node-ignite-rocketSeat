import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
    name: string;
    email: string;
    password: string;
}

//SOLID

// D - Dependency Inversion Principle

export class RegisterUseCase {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(private usersRepository: any) {}
	
	async handle({
		name,
		email,
		password,
	}: RegisterUseCaseRequest) {
		try {
			const password_hash = await hash(password, 6);
			
			const userWithSameEmail = await prisma.user.findUnique({
				where: {
					email,
				},
			});
			
			if (userWithSameEmail) {
				throw new Error('User with same email');
			}
			
			await this.usersRepository.create({
				name,
				email,
				password_hash,
			});
	
		} catch (error) {
			console.log(error);
		}
	}

}
