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
		const checkIn = await this.checkInsRepository.create({
			gym_id:gymID,
			user_id:userID,
		});

		return {
			checkIn,
		};
	}
}
