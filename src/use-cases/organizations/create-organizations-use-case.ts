import { Organization } from '@prisma/client'
import { OrganizationRepository } from '../../repositories/organization-repository'
import { OrganizationAlreadyExistsError } from '../../errors/organization-already-exists-error'
import { DifferentPasswordsError } from '../../errors/different-password-error'
import { hash } from 'bcryptjs'

interface CreateOrganizationsUseCaseRequest {
  name: string
  email: string
  cep: string
  address: string
  whatsapp: string
  password: string
  confirm_password: string
}

interface CreateOrganizationsUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationsUseCase {
  constructor(private organizationsRepository: OrganizationRepository) {}

  async execute({
    name,
    email,
    cep,
    address,
    whatsapp,
    password,
    confirm_password,
  }: CreateOrganizationsUseCaseRequest): Promise<CreateOrganizationsUseCaseResponse> {
    const organizationExists =
      await this.organizationsRepository.findByEmail(email)

    if (organizationExists) {
      throw new OrganizationAlreadyExistsError()
    }

    if (password !== confirm_password) {
      throw new DifferentPasswordsError()
    }

    const password_hashed = await hash(password, 6)

    const organization = await this.organizationsRepository.create({
      name,
      email,
      cep,
      address,
      whatsapp,
      password_hash: password_hashed,
    })

    return { organization }
  }
}
