import type { Request, Response, NextFunction } from 'express';
import { AppError, SQL_ERRORS } from '@taskmeup/shared';
import type { DatabaseError } from 'pg';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (isDatabaseError(error)) {
    switch (error.code) {
      case SQL_ERRORS.UNIQUE_VIOLATION:
        return res.status(409).json({
          message: 'Resource already exists',
        });

      case SQL_ERRORS.FOREIGN_KEY_VIOLATION:
        return res.status(409).json({
          message: 'Referenced resource does not exist',
        });

      case SQL_ERRORS.NOT_NULL_VIOLATION:
        return res.status(400).json({
          message: 'A required field is missing',
        });

      case SQL_ERRORS.CHECK_VIOLATION:
        return res.status(400).json({
          message: 'Invalid value provided',
        });

      case SQL_ERRORS.EXCLUSION_VIOLATION:
        return res.status(409).json({
          message: 'Resource conflicts with an existing record',
        });

      default:
        console.error('Unhandled database error:', error);
        return res.status(500).json({
          message: 'Internal server error',
        });
    }
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  console.error(error);

  return res.status(500).json({ message: 'Internal server error' });
}

function isDatabaseError(error: unknown): error is DatabaseError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string' &&
    'severity' in error
  );
}
