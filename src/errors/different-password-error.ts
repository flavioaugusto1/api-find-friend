import { AppError } from './app-error'

export class DifferentPasswordsError extends AppError {
  constructor() {
    super({ message: 'As senhas informadas estão diferentes', statusCode: 409 })
  }
}
