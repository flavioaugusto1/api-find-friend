import { Prisma, Pet } from '@prisma/client'
import { SearchPets, PetRepository } from '../pet-repository'
import { InMemoryOrganizationRepository } from './in-memory-organization-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository implements PetRepository {
  private pets: Pet[] = []

  constructor(
    private organizationsRepository: InMemoryOrganizationRepository,
  ) {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      ...data,
    }

    this.pets.push(pet)

    return pet
  }

  async searchPets(data: SearchPets): Promise<Pet[]> {
    const organizationByCity =
      this.organizationsRepository.organizations.filter(
        (org) => org.city === data.city,
      )

    const pets = this.pets
      .filter((item) =>
        organizationByCity.some((org) => org.id === item.organizationId),
      )
      .filter((item) => (data.age ? item.age === data.age : true))
      .filter((item) => (data.size ? item.size === data.size : true))
      .filter((item) =>
        data.energyLevel ? item.energy_level === data.energyLevel : true,
      )
      .filter((item) =>
        data.independenceLevel
          ? item.independence_level === data.independenceLevel
          : true,
      )
      .filter((item) =>
        data.environment ? item.environment === data.environment : true,
      )

    return pets
  }

  async getPetById(id: string): Promise<Pet | null> {
    const pet = await this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
