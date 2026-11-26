import type { Request, Response, NextFunction } from 'express';
import { createNewWorkspace } from '../service/workspace.service.js';
import { UnauthorizedError } from '@taskmeup/shared';

export async function createNewWorkspaceController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { workspaceName } = req.body;
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Invalid access');
    }

    const workspaceId = await createNewWorkspace(workspaceName, userId);

    res.status(201).json({
      workspaceId,
      message: 'Workspace creation successful',
    });
  } catch (error) {
    next(error);
  }
}
