import { faker } from '@faker-js/faker'

import { randomUUID } from 'node:crypto'

interface MakePet {
  organizationId: string
  city?: string
  age?: string
  size?: string
  energy_level?: string
  independence_level?: string
  environment?: string
}

export function makePet(pet: MakePet) {
  return {
    id: randomUUID(),
    organizationId: pet.organizationId,
    name: faker.animal.dog(),
    about: faker.lorem.paragraph(),
    age: pet.age ?? faker.number.int().toString(),
    size: pet.size ?? faker.helpers.arrayElement(['small', 'medium', 'large']),
    energy_level:
      pet.energy_level ?? faker.helpers.arrayElement(['low', 'medium', 'high']),
    independence_level:
      pet.independence_level ?? faker.helpers.arrayElement(['low', 'medium']),
    environment:
      pet.environment ?? faker.helpers.arrayElement(['indoor', 'outdoor']),
  }
}
