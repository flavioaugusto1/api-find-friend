import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '../../repositories/in-memory-repository/in-memory-pet-repository'
import { CreatePetsUseCase } from '../../use-cases/pets/create-pets-use-case'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory-repository/in-memory-organization-repository'
import { OrganizationNotFound } from '../../errors/organization-not-found-error'
import { makeOrganization } from '../factories/make-organization.factory'
import { makePet } from '../factories/make-pet.factory'

let petsRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: CreatePetsUseCase

describe('Create Pet Use Case', async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetRepository(organizationRepository)
    sut = new CreatePetsUseCase(petsRepository, organizationRepository)
  })

  it('should be able create a pet', async () => {
    const org_id = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const { pet } = await sut.execute(makePet({ organizationId: org_id.id }))

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be not able create a pet to inexistent organization', async () => {
    await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await expect(async () => {
      await sut.execute(makePet({ organizationId: '1234' }))
    }).rejects.toBeInstanceOf(OrganizationNotFound)
  })
})
