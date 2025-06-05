import { Prisma, Organization } from '@prisma/client'
import { OrganizationRepository } from '../organization-repository'
import { prisma } from '../../lib/prisma'

export class PrismaOrganizationRepository implements OrganizationRepository {
  async create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    const organization = await prisma.organization.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password_hash,
        cep: data.cep,
        city: data.city,
        street: data.street,
        state: data.state,
        neighborhood: data.neighborhood,
        whatsapp: data.whatsapp,
      },
    })

    return organization
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = await prisma.organization.findFirst({
      where: {
        id,
      },
    })

    if (!organization) {
      return null
    }

    return organization
  }
}
