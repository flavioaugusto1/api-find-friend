import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory-repository/in-memory-organization-repository'
import { AuthenticateUseCase } from '../../use-cases/organizations/authenticate-use-case'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../../errors/invalid-credentials-error'
import { makeOrganization } from '../factories/make-organization.factory'

let organizationsRepository: InMemoryOrganizationRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateUseCase(organizationsRepository)
  })

  it('should be able authenticate organization', async () => {
    const { email } = await organizationsRepository.create(
      makeOrganization({ password: await hash('securePassword123', 6) }),
    )

    const { organization } = await sut.execute({
      email,
      password: 'securePassword123',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be not able authenticate with inexistent e-mail', async () => {
    await organizationsRepository.create(
      makeOrganization({ password: await hash('securePassword123', 6) }),
    )

    await expect(async () => {
      await sut.execute({
        email: 'johndoe2@example.com',
        password: 'securePassword123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be not able authenticate with wrong password', async () => {
    await organizationsRepository.create(
      makeOrganization({ password: await hash('securePassword123', 6) }),
    )

    await expect(async () => {
      await sut.execute({
        email: 'johndoe@example.com',
        password: 'securePassword1234',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
