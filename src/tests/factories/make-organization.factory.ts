import { faker } from '@faker-js/faker'

interface Organization {
  password?: string
}

export function makeOrganization(org: Organization) {
  return {
    name: faker.company.name(),
    email: faker.internet.email(),
    whatsapp: faker.phone.number(),
    password_hash: org.password ?? faker.internet.password(),
    cep: faker.location.zipCode(),
    street: faker.location.street(),
    state: faker.location.state(),
    city: faker.location.city(),
    neighborhood: faker.location.streetAddress(),
  }
}
