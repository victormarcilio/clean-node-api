import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../protocols/http'

export const createBadRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const createServerError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
