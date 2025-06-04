import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory-repository/in-memory-organization-repository'
import { makeOrganization } from '../factories/make-organization.factory'

let organizationsRepository: InMemoryOrganizationRepository

describe('Get Organization', async () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
  })

  it('should be able get organization by id', async () => {
    const { id } = await organizationsRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization = await organizationsRepository.findById(id)

    expect(organization?.id).toEqual(expect.any(String))
  })

  it('should be able get organization by e-mail', async () => {
    const { email } = await organizationsRepository.create(
      makeOrganization({ password: 'securePassword123' }),
    )

    const organization = await organizationsRepository.findByEmail(email)

    expect(organization?.id).toEqual(expect.any(String))
  })
})
