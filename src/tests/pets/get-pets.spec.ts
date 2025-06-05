import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '../../repositories/in-memory-repository/in-memory-pet-repository'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory-repository/in-memory-organization-repository'
import { makeOrganization } from '../factories/make-organization.factory'
import { makePet } from '../factories/make-pet.factory'
import { GetPetsUseCase } from '../../use-cases/pets/get-pets-use-case'
import { PetNotFoundError } from '../../errors/pet-not-found-error'

let petsRepository: InMemoryPetRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetPetsUseCase

describe('Get Pets Use Case', async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository()
    petsRepository = new InMemoryPetRepository(organizationRepository)
    sut = new GetPetsUseCase(petsRepository)
  })

  it('should be able get pet by id', async () => {
    const org_id = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const { id } = await petsRepository.create(
      makePet({ organizationId: org_id.id }),
    )

    const { pet } = await sut.execute(id)

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should be not able get pet by inexistent id', async () => {
    const org_id = await organizationRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    await petsRepository.create(makePet({ organizationId: org_id.id }))

    await expect(async () => {
      await sut.execute('123')
    }).rejects.toBeInstanceOf(PetNotFoundError)
  })
})
