import { Prisma, Organization } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const newOrganization = {
      ...data,
      id: data.id ?? randomUUID(),
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

  async findById(id: string): Promise<Organization | null> {
    const organization = this.organizations.find(
      (organization) => organization.id === id,
    )

    if (!organization) {
      return null
    }

    return organization
  }
}
