import { Pet } from '@prisma/client'
import { PetRepository } from '../../repositories/pet-repository'
import { PetNotFoundError } from '../../errors/pet-not-found-error'

interface GetPetsUseCaseResponse {
  pet: Pet
}

export class GetPetsUseCase {
  constructor(private petsRepository: PetRepository) {}

  async execute(id: string): Promise<GetPetsUseCaseResponse> {
    const pet = await this.petsRepository.getPetById(id)

    if (!pet) {
      throw new PetNotFoundError()
    }

    return { pet }
  }
}
