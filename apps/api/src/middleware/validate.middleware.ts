import type { Request, Response, NextFunction } from 'express';
import type { ZodType } from 'zod';
import {
  UnauthorizedError,
  ForbiddenError,
  BadRequestError,
} from '@taskmeup/shared';
import { verifyMembership } from '../service/workspace.service.js';

export function validateBody(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = schema.safeParse(req.body);

      if (!result.success) {
        return res.status(400).json({
          message: 'Data validation failed',
          errors: result.error.issues.map((issue) => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        });
      }

      req.body = result.data;

      next();
    } catch (error) {
      next(error);
    }
  };
}

type WorkspaceIdSource = 'params' | 'body';

export function validateWorkspaceId(source: WorkspaceIdSource) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const workspaceId = req[source].workspaceId;
      const userId = req.userId;

      if (!workspaceId || Array.isArray(workspaceId)) {
        throw new BadRequestError('Malformed data');
      }

      if (!userId) {
        throw new UnauthorizedError('Unauthorized');
      }

      const isValidMember = await verifyMembership(userId, workspaceId);

      if (!isValidMember) {
        throw new ForbiddenError('Unauthorized');
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}
