import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '../../repositories/in-memory-repository/in-memory-pet-repository'
import { SearchPetsUseCase } from '../../use-cases/pets/search-pets-use-case'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory-repository/in-memory-organization-repository'
import { makePet } from '../factories/make-pet.factory'
import { makeOrganization } from '../factories/make-organization.factory'

let petsRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: SearchPetsUseCase

describe('Search Pets Use Case', async () => {
  beforeEach(async () => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetRepository(organizationRepository)
    sut = new SearchPetsUseCase(petsRepository)
  })

  it('should be able search pets by city', async () => {
    const organization = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization2 = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(makePet({ organizationId: organization.id }))
    await petsRepository.create(makePet({ organizationId: organization.id }))

    await petsRepository.create(makePet({ organizationId: organization2.id }))

    const { pets } = await sut.execute({ city: organization.city })

    expect(pets).toHaveLength(2)

    const { pets: newPets } = await sut.execute({ city: organization2.city })

    expect(newPets).toHaveLength(1)
  })

  it('should be able search pets by city and size', async () => {
    const organization = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization2 = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization.id, size: 'medium' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization2.id, size: 'small' }),
    )
    await petsRepository.create(
      makePet({ organizationId: organization2.id, size: 'small' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      size: 'medium',
    })

    expect(pets).toHaveLength(1)

    const { pets: newPets } = await sut.execute({
      city: organization2.city,
      size: 'small',
    })

    expect(newPets).toHaveLength(2)
  })

  it('should be able search pets by city and age', async () => {
    const organization = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization2 = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization.id, age: '5' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization2.id, age: '10' }),
    )
    await petsRepository.create(
      makePet({ organizationId: organization2.id, age: '10' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      age: '5',
    })

    expect(pets).toHaveLength(1)

    const { pets: newPets } = await sut.execute({
      city: organization2.city,
      age: '10',
    })

    expect(newPets).toHaveLength(2)
  })

  it('should be able search pets by city and energy level', async () => {
    const organization = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization2 = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization.id, energy_level: 'high' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      energyLevel: 'high',
    })

    expect(pets).toHaveLength(1)

    await petsRepository.create(
      makePet({ organizationId: organization2.id, energy_level: 'low' }),
    )
    await petsRepository.create(
      makePet({ organizationId: organization2.id, energy_level: 'low' }),
    )

    const { pets: newPets } = await sut.execute({
      city: organization2.city,
      energyLevel: 'low',
    })

    expect(newPets).toHaveLength(2)
  })

  it('should be able search pets by city and independence level', async () => {
    const organization = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization2 = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization.id, independence_level: 'low' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      independenceLevel: 'low',
    })

    expect(pets).toHaveLength(1)

    await petsRepository.create(
      makePet({
        organizationId: organization2.id,
        independence_level: 'medium',
      }),
    )
    await petsRepository.create(
      makePet({
        organizationId: organization2.id,
        independence_level: 'medium',
      }),
    )

    const { pets: newPets } = await sut.execute({
      city: organization2.city,
      independenceLevel: 'medium',
    })

    expect(newPets).toHaveLength(2)
  })

  it('should be able search pets by city and environment', async () => {
    const organization = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization2 = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(
      makePet({ organizationId: organization.id, environment: 'indoor' }),
    )

    await petsRepository.create(
      makePet({
        organizationId: organization2.id,
        environment: 'outdoor',
      }),
    )
    await petsRepository.create(
      makePet({
        organizationId: organization2.id,
        environment: 'outdoor',
      }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      environment: 'indoor',
    })

    expect(pets).toHaveLength(1)

    const { pets: newPets } = await sut.execute({
      city: organization2.city,
      environment: 'outdoor',
    })

    expect(newPets).toHaveLength(2)
  })
})
