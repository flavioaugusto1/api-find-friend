import { FastifyInstance } from 'fastify'
import { createOrganizationController } from './create-organization-controller'
import { authenticateController } from './authenticate-controller'

export function organizationRoutes(app: FastifyInstance) {
  app.post('/signup', createOrganizationController)
  app.post('/signin', authenticateController)
}
