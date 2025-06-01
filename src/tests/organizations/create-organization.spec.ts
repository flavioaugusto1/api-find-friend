import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationsUseCase } from '../../use-cases/organizations/create-organizations-use-case'
import { InMemoryOrganizationRepository } from '../../repositories/in-memory-repository/in-memory-organization-repository'
import { OrganizationAlreadyExistsError } from '../../errors/organization-already-exists-error'
import { DifferentPasswordsError } from '../../errors/different-password-error'
import { compare } from 'bcryptjs'

let organizationsRepository: InMemoryOrganizationRepository
let sut: CreateOrganizationsUseCase

describe('Create Organization UseCase', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new CreateOrganizationsUseCase(organizationsRepository)
  })

  it('should be able create a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe Organization',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: '123 Main Street, City, State',
      whatsapp: '+5511999999999',
      password: 'securePassword123',
      confirm_password: 'securePassword123',
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be not able create a new organization with same e-mail', async () => {
    await sut.execute({
      name: 'John Doe Organization',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: '123 Main Street, City, State',
      whatsapp: '+5511999999999',
      password: 'securePassword123',
      confirm_password: 'securePassword123',
    })

    await expect(async () => {
      await sut.execute({
        name: 'John Doe Organization',
        email: 'johndoe@example.com',
        cep: '12345-678',
        address: '123 Main Street, City, State',
        whatsapp: '+5511999999999',
        password: 'securePassword123',
        confirm_password: 'securePassword123',
      })
    }).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })

  it('should be not able create a new organization with different password confirm', async () => {
    await expect(async () => {
      await sut.execute({
        name: 'John Doe Organization',
        email: 'johndoe@example.com',
        cep: '12345-678',
        address: '123 Main Street, City, State',
        whatsapp: '+5511999999999',
        password: 'securePassword123',
        confirm_password: 'securePassword1234',
      })
    }).rejects.toBeInstanceOf(DifferentPasswordsError)
  })

  it('should be able hash password', async () => {
    const { organization } = await sut.execute({
      name: 'John Doe Organization',
      email: 'johndoe@example.com',
      cep: '12345-678',
      address: '123 Main Street, City, State',
      whatsapp: '+5511999999999',
      password: 'securePassword123',
      confirm_password: 'securePassword123',
    })

    const passwordHashed = await compare(
      'securePassword123',
      organization.password_hash,
    )

    expect(passwordHashed).toBe(true)
  })
})
