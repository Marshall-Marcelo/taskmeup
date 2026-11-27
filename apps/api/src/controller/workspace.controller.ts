import type { Request, Response, NextFunction } from 'express';
import {
  createNewWorkspace,
  getWorkspaceDetails,
  getWorkspaces,
} from '../service/workspace.service.js';
import { UnauthorizedError, BadRequestError } from '@taskmeup/shared';

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

    const workspace = await createNewWorkspace(workspaceName, userId);

    res.status(201).json({
      workspace,
      message: 'Workspace creation successful',
    });
  } catch (error) {
    next(error);
  }
}

export async function getWorkspaceDetailsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { workspaceId } = req.params;

    if (!workspaceId || Array.isArray(workspaceId)) {
      throw new BadRequestError('Malformed data');
    }

    const workspace = await getWorkspaceDetails(workspaceId);

    res.status(200).json(workspace);
  } catch (error) {
    next(error);
  }
}

export async function getWorkspacesController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.userId;

    if (!userId) {
      throw new UnauthorizedError('Invalid access');
    }

    const workspaces = await getWorkspaces(userId);

    res.status(200).json(workspaces);
  } catch (error) {
    next(error);
  }
}
