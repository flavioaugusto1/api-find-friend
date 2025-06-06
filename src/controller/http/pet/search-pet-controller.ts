import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-repository/prisma-pet-repository'
import { SearchPetsUseCase } from '../../../use-cases/pets/search-pets-use-case'

export async function searchPetController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestQuerySchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energyLevel: z.string().optional(),
    independenceLevel: z.string().optional(),
    environment: z.string().optional(),
  })

  const data = requestQuerySchema.parse(request.query)

  const petsRepository = new PrismaPetRepository()
  const searchPetsUseCase = new SearchPetsUseCase(petsRepository)

  const { pets } = await searchPetsUseCase.execute(data)

  return response.status(200).send({
    pets,
  })
}
