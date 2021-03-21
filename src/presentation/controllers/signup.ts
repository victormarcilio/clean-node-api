import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../errors/missing-param-error'
import { createBadRequest } from '../helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return createBadRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return createBadRequest(new MissingParamError('email'))
    }

    return {
      statusCode: 200,
      body: 'Ok'
    }
  }
}
