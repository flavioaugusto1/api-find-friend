import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-repository/prisma-pet-repository'
import { GetPetsUseCase } from '../../../use-cases/pets/get-pets-use-case'

export async function getPetController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestParamSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = requestParamSchema.parse(request.params)

  const petRepository = new PrismaPetRepository()
  const getPetByIdUseCase = new GetPetsUseCase(petRepository)

  const { pet } = await getPetByIdUseCase.execute(id)

  return response.status(200).send({
    pet,
  })
}
