import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';
import { GymsRepository } from '@/repositories/gyms-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

type CheckInUseCaseRequest = {
    userID: string;
    gymID: string;
	userLatitude: number;
	userLongitude: number;
}

type CheckInUseCaseResponse = {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository,
	) {}

	async handle({ 
		userID, 
		gymID, 
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymID);

		if (!gym) {
			throw new ResourceNotFoundError();
		}

		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(userID, new Date());

		if (checkInOnSameDate) {
			throw new Error();
		}

		const checkIn = await this.checkInsRepository.create({
			gym_id:gymID,
			user_id:userID,
		});

		return {
			checkIn,
		};
	}
}
