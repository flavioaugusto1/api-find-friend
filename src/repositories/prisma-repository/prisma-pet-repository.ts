import { Prisma, Pet } from '@prisma/client'
import { PetRepository, SearchPets } from '../pet-repository'
import { prisma } from '../../lib/prisma'

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async getPetById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findFirst({
      where: {
        id,
      },
    })

    if (!pet) {
      return null
    }

    return pet
  }

  async searchPets(data: SearchPets): Promise<Pet[]> {
    const organization = await prisma.organization.findFirst({
      where: {
        city: data.city,
      },
    })

    const pets = await prisma.pet.findMany({
      where: {
        organizationId: organization?.id,
        AND: [
          data.age ? { age: data.age } : {},
          data.size ? { size: data.size } : {},
          data.energyLevel ? { energy_level: data.energyLevel } : {},
          data.independenceLevel
            ? { independence_level: data.independenceLevel }
            : {},
          data.environment ? { environment: data.environment } : {},
        ],
      },
    })

    return pets
  }
}
