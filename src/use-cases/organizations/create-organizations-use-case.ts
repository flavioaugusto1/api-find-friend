import { Organization } from '@prisma/client'
import { OrganizationRepository } from '../../repositories/organization-repository'

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
    const organization = await this.organizationsRepository.create({
      name,
      email,
      cep,
      address,
      whatsapp,
      password_hash: password,
    })
    return { organization }
  }
}
