import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaPetRepository } from '../../../repositories/prisma-repository/prisma-pet-repository'
import { CreatePetsUseCase } from '../../../use-cases/pets/create-pets-use-case'
import { PrismaOrganizationRepository } from '../../../repositories/prisma-repository/prisma-organization-repository'

export async function createPetController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z.string().trim(),
    about: z.string(),
    age: z.string(),
    size: z.string(),
    energy_level: z.string(),
    independence_level: z.string(),
    environment: z.string(),
  })

  const data = requestBodySchema.parse(request.body)

  const petsRepository = new PrismaPetRepository()
  const organizationRepository = new PrismaOrganizationRepository()
  const createPetUseCase = new CreatePetsUseCase(
    petsRepository,
    organizationRepository,
  )

  const { pet } = await createPetUseCase.execute({
    ...data,
    organizationId: request.user.sub,
  })

  return response.status(201).send({
    pet,
  })
}
