import { AppError } from './app-error'

export class OrganizationNotFound extends AppError {
  constructor() {
    super({
      statusCode: 404,
      message: 'Organizaçõa informada não foi encontrada.',
    })
  }
}
