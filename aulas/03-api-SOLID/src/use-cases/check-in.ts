import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-ins-repository';

type CheckInUseCaseRequest = {
    userID: string;
    gymID: string;
}

type CheckInUseCaseResponse = {
	checkIn: CheckIn
}

export class CheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({ 
		userID, 
		gymID, 
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
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
