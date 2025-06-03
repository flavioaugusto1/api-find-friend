import { AppError } from './app-error'

export class InvalidCredentialsError extends AppError {
  constructor() {
    super({ message: 'E-mail e/ou senha inválidos!', statusCode: 401 })
  }
}
