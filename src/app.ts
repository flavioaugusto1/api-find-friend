import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { env } from './env'
import { ZodError } from 'zod/v4'
import { AppError } from './errors/app-error'
import { organizationRoutes } from './controller/http/organization'
import { petsRoutes } from './controller/http/pet'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
})

app.register(organizationRoutes)
app.register(petsRoutes, { prefix: '/pet' })

app.setErrorHandler((error, request, response) => {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .send({ message: 'Validation Error!', issues: error.format() })
  }

  if (error instanceof AppError) {
    return response.status(error.statusCode).send({
      message: error.message,
    })
  }

  return response.status(500).send({
    message: 'Internal server error!',
  })
})
