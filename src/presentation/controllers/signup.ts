import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError, InvalidParamError } from '../errors'
import { createBadRequest, createServerError } from '../helpers/http-helper'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return createBadRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return createBadRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      return createServerError()
    }

    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}
