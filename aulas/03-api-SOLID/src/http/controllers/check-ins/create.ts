import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { makeCheckInsUseCase } from '@/use-cases/factories/make-check-in-use-case';

export async function create(request:FastifyRequest, reply: FastifyReply) {
	const createCheckInParamsSchema = z.object({
		gymID: z.string().uuid(),
	});

	const createCheckInBodySchema = z.object({
		latitude: z.number().refine(value => {
			return Math.abs(value) <= 90;
		}),
		longitude: z.number().refine(value => {
			return Math.abs(value) <= 180;
		}),
	});

	const { gymID } = createCheckInParamsSchema.parse(request.params);
	const { latitude, longitude } = createCheckInBodySchema.parse(request.body);

	const createCheckInUseCase = makeCheckInsUseCase();

	await createCheckInUseCase.handle({
		gymID,
		userID: request.user.sub,
		userLatitude: latitude,
		userLongitude: longitude,
	});
	
	return reply.status(201).send();
}