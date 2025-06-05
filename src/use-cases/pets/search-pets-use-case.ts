import { Pet } from '@prisma/client'
import { PetRepository } from '../../repositories/pet-repository'

interface SearchPetsUseCaseRequest {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
  environment?: string
}

interface SearchPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchPetsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    environment,
    independenceLevel,
  }: SearchPetsUseCaseRequest): Promise<SearchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchPets({
      city,
      age,
      size,
      energyLevel,
      environment,
      independenceLevel,
    })

    return { pets }
  }
}
