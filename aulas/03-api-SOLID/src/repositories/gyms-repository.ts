import { Gym } from '@prisma/client';

export interface GymsRepository {
	items: Gym[];
    findById(id: string): Promise<Gym | null>
}