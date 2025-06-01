import { Prisma, Organization } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  private organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const newOrganization = {
      id: '123',
      name: data.name,
      email: data.email,
      cep: data.cep,
      address: data.address,
      whatsapp: data.whatsapp,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    await this.organizations.push(newOrganization)

    return newOrganization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await this.organizations.find(
      (organization) => organization.email === email,
    )

    if (!organization) {
      return null
    }

    return organization
  }
}
