import { Pet, Prisma } from '@prisma/client'

export interface SearchPets {
  city: string
  age?: string
  size?: string
  energyLevel?: string
  independenceLevel?: string
  environment?: string
}

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  searchPets(data: SearchPets): Promise<Pet[]>
}
