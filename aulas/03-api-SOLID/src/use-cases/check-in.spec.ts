import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository';
import { CheckInUseCase } from './check-in';

let checkInsRepository: InMemoryCheckInsRepository;
let sut: CheckInUseCase;

describe('Check in Use Case', () => {
	beforeEach(() => { 
		checkInsRepository = new InMemoryCheckInsRepository();
		sut = new CheckInUseCase(checkInsRepository);

		vi.useFakeTimers();
	});

	afterEach(() => { 
		vi.useRealTimers();
	});

	it('Should be possible to check in', async() => {
		const { checkIn } = await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
	
	it('Should not be able possible to check-in twice in the same day', async() => {
		vi.setSystemTime(new Date(
			2022, 0, 20, 8, 0, 0,
		));

		await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
		});

		await expect(() => 
			sut.handle({
				gymID: 'gym-01',
				userID: 'user-01',
			})).rejects.toBeInstanceOf(Error);
	});

	it('Should not be able possible to check-in twice but in different days', async() => {
		vi.setSystemTime(new Date(
			2022, 0, 20, 8, 0, 0,
		));
		
		await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
		});

		vi.setSystemTime(new Date(
			2022, 0, 21, 8, 0, 0,
		));

		const { checkIn } = await sut.handle({
			gymID: 'gym-01',
			userID: 'user-01',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});