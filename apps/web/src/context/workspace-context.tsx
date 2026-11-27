import { createContext, useState } from 'react';

interface WorkspaceContextType {
  workspaceId: string;
  setWorkspaceId: React.Dispatch<React.SetStateAction<string>>;
  workspaceName: string;
  setWorkspaceName: React.Dispatch<React.SetStateAction<string>>;
}

export const WorkspaceContext = createContext<WorkspaceContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export function WorkspaceProvider({ children }: Props) {
  const [workspaceId, setWorkspaceId] = useState<string>('');
  const [workspaceName, setWorkspaceName] = useState<string>('');

  return (
    <WorkspaceContext.Provider
      value={{ workspaceId, setWorkspaceId, workspaceName, setWorkspaceName }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
