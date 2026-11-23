export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number,
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class MethodNotAllowedError extends AppError {
  constructor(message: string) {
    super(message, 405);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class GoneError extends AppError {
  constructor(message: string) {
    super(message, 410);
  }
}

export class PayloadTooLargeError extends AppError {
  constructor(message: string) {
    super(message, 413);
  }
}

export class UnsupportedMediaTypeError extends AppError {
  constructor(message: string) {
    super(message, 415);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
  }
}

export class TooManyRequestsError extends AppError {
  constructor(message: string) {
    super(message, 429);
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500);
  }
}

export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service temporarily unavailable') {
    super(message, 503);
  }
}

export const SQL_ERRORS = {
  NOT_NULL_VIOLATION: '23502',
  FOREIGN_KEY_VIOLATION: '23503',
  UNIQUE_VIOLATION: '23505',
  CHECK_VIOLATION: '23514',
  EXCLUSION_VIOLATION: '23P01',
} as const;
