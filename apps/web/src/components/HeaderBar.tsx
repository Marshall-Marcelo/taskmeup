import { cn } from 'cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';
import { useGetWorkspaces } from '@/features/workspace/hooks/useWorkspace';
import { Spinner } from '@/components/ui/spinner';
import type { WorkspaceList } from '@taskmeup/shared';
import { useEffect } from 'react';
import { ArrowDown } from 'lucide-react';
import { useWorkspaceContext } from '@/hooks/useWorkspaceContext';

type Props = {
  className?: string;
};

const HeaderBar = ({ className }: Props) => {
  const { data: workspaces, isPending } = useGetWorkspaces();

  if (isPending || !workspaces) return <Spinner />;

  return (
    <div
      className={cn('shadow-xl p-4 flex flex-row justify-between', className)}
    >
      <HeaderDropdown workspaces={workspaces} />
      HeaderBar
    </div>
  );
};

type HeaderDropdownProps = {
  workspaces: WorkspaceList[];
};

const HeaderDropdown = ({ workspaces }: HeaderDropdownProps) => {
  const firstWorkspace: WorkspaceList = {
    workspaceId: workspaces[0].workspaceId,
    workspaceName: workspaces[0].workspaceName,
  };

  const { setWorkspaceId, workspaceName, setWorkspaceName } =
    useWorkspaceContext();

  useEffect(() => {
    setWorkspaceId(firstWorkspace.workspaceId);
    setWorkspaceName(firstWorkspace.workspaceName);
  }, [
    firstWorkspace.workspaceId,
    firstWorkspace.workspaceName,
    setWorkspaceName,
    setWorkspaceId,
  ]);

  const handleClick = (workspaceName: string, workspaceId: string) => {
    setWorkspaceName(workspaceName);
    setWorkspaceId(workspaceId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <span className="flex items-center gap-1">
            {workspaceName}
            <ArrowDown size={14} />
          </span>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          {workspaces.length !== 0 ? (
            workspaces.map((workspace) => (
              <DropdownMenuItem
                onClick={() =>
                  handleClick(workspace.workspaceName, workspace.workspaceId)
                }
                key={workspace.workspaceName}
                className="focus:bg-transparent data-highlighted:bg-transparent"
              >
                {workspace.workspaceName}
              </DropdownMenuItem>
            ))
          ) : (
            <DropdownMenuItem className="focus:bg-transparent data-highlighted:bg-transparent">
              No Workspaces Found
            </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="focus:bg-transparent data-highlighted:bg-transparent">
            <Link to="/workspace/new">Create new workspace</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderBar;
