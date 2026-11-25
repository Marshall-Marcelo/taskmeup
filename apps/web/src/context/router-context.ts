import type { LoggedInUser } from '@taskmeup/shared';

export interface RouterContext {
  user?: LoggedInUser;
  isAuthenticated: boolean;
}
