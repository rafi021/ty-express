export class SuccessResponse<T> {
  constructor(public message: string, public data?: T) {}
}

export class ErrorResponse {
  constructor(public message: string, public statusCode: number) {}
}

