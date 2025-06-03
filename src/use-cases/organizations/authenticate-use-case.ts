import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'
import { OrganizationRepository } from '../../repositories/organization-repository'
import { Organization } from '@prisma/client'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  organization: Organization
}

export class AuthenticateUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const organization = await this.organizationsRepository.findByEmail(email)

    if (!organization) {
      throw new InvalidCredentialsError()
    }

    const passwordMatch = await compare(password, organization.password_hash)

    if (!passwordMatch) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
