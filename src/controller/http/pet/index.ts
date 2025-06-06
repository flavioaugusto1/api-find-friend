import { FastifyInstance } from 'fastify'
import { createPetController } from './create-pet-controller'
import { getPetController } from './get-pet-controller'
import { verifyJWT } from '../../middlewares/verift-jwt'
import { searchPetController } from './search-pet-controller'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
  app.post('/new', createPetController)
  app.get('/:id', getPetController)
  app.get('/find', searchPetController)
}
