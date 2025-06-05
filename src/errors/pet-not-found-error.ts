import { AppError } from './app-error'

export class PetNotFoundError extends AppError {
  constructor() {
    super({
      statusCode: 404,
      message: 'O pet não foi localizado.',
    })
  }
}
