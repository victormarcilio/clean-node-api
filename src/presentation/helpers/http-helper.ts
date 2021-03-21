import { HttpResponse } from '../protocols/http'

export const createBadRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
