import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';
import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository';

export const makeFetchNearbyGymsUseCase = () => {
	const gymsRepository = new PrismaGymsRepository();
	const fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository);

	return fetchNearbyGymsUseCase;
};