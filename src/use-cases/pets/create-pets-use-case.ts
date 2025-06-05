import { PetRepository } from '../../repositories/pet-repository'
import { OrganizationRepository } from '../../repositories/organization-repository'
import { OrganizationNotFound } from '../../errors/organization-not-found-error'
import { Pet } from '@prisma/client'

interface CreatePetsUseCaseRequest {
  name: string
  about: string
  age: string
  size: string
  energy_level: string
  independence_level: string
  environment: string
  organizationId: string
}

interface CreatePetsUseCaseResponse {
  pet: Pet
}

export class CreatePetsUseCase {
  constructor(
    private petsRepository: PetRepository,
    private organizationRepository: OrganizationRepository,
  ) {}

  async execute({
    name,
    about,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    organizationId,
  }: CreatePetsUseCaseRequest): Promise<CreatePetsUseCaseResponse> {
    const organization =
      await this.organizationRepository.findById(organizationId)

    if (!organization) {
      throw new OrganizationNotFound()
    }

    const pet = await this.petsRepository.create({
      name,
      about,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      organizationId,
    })

    return { pet }
  }
}
