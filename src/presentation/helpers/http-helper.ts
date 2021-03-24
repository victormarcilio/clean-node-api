import { ServerError } from '../errors'
import { HttpResponse } from '../protocols'

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
