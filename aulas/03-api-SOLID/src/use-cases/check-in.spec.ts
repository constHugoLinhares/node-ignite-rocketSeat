import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let checkInsUseCase: CheckInUseCase;

describe('Check in Use Case', () => {
	beforeEach(() => { 
		checkInsRepository = new InMemoryCheckInsRepository();
		checkInsUseCase = new CheckInUseCase(checkInsRepository);
	});

	it('Should be possible to check in', async() => {
		const { checkIn } = await checkInsUseCase.handle({
			gymID: 'gym-01',
			userID: 'user-01',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});