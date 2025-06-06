import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { PrismaOrganizationRepository } from '../../../repositories/prisma-repository/prisma-organization-repository'
import { CreateOrganizationsUseCase } from '../../../use-cases/organizations/create-organizations-use-case'

export async function createOrganizationController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestBodySchema = z.object({
    name: z
      .string()
      .trim()
      .min(1, { message: 'O nome precisa ter pelo menos um caractere' }),
    email: z.string().email(),
    whatsapp: z.string(),
    cep: z.string(),
    street: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' }),
    confirm_password: z
      .string()
      .trim()
      .min(6, { message: 'A senha precisa ter no mínimo 6 caracteres' }),
  })

  const data = requestBodySchema.parse(request.body)

  const organizationRepository = new PrismaOrganizationRepository()
  const createOrganizationsUseCase = new CreateOrganizationsUseCase(
    organizationRepository,
  )

  const { organization } = await createOrganizationsUseCase.execute(data)

  return response.status(201).send({ organization })
}
