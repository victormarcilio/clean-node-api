import { HttpRequest, HttpResponse, Controller, EmailValidator } from '../protocols'
import { MissingParamError, InvalidParamError } from '../errors'
import { createBadRequest, createServerError } from '../helpers/http-helper'
import { AddAccount } from '../../domain/use-cases/add-account'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return createBadRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body
      if (password !== passwordConfirmation) {
        return createBadRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return createBadRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name,
        email,
        password
      })
    } catch (error) {
      return createServerError()
    }

    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}
