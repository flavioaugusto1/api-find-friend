import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { PrismaOrganizationRepository } from '../../../repositories/prisma-repository/prisma-organization-repository'
import { AuthenticateUseCase } from '../../../use-cases/organizations/authenticate-use-case'

export async function authenticateController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z
      .string()
      .trim()
      .min(6, { message: 'A senha precisa de no mínimo 6 caracteres' }),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  const organizationsRepository = new PrismaOrganizationRepository()
  const authenticateUseCase = new AuthenticateUseCase(organizationsRepository)

  const { organization } = await authenticateUseCase.execute({
    email,
    password,
  })

  const token = await response.jwtSign(
    {},
    {
      sign: {
        sub: organization.id,
        expiresIn: '1d',
      },
    },
  )

  const { password_hash, ...organizationWithoutPassword } = organization

  return response.status(200).send({
    organization: organizationWithoutPassword,
    token,
  })
}
