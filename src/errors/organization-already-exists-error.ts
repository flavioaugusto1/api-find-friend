import { AppError } from './app-error'

export class OrganizationAlreadyExistsError extends AppError {
  constructor() {
    super({ message: 'O e-mail informado já existe.', statusCode: 400 })
  }
}
