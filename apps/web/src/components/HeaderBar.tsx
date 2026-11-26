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
import { useState } from 'react';
import { ArrowDown } from 'lucide-react';

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
  const [selectedWorkspace, setSelectedWorkspace] = useState(
    'No workplace selected',
  );
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <span className="flex items-center gap-1">
            {selectedWorkspace}
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
                onClick={() => setSelectedWorkspace(workspace.workspaceName)}
                key={workspace.workspaceName}
                className="focus:bg-transparent data-highlighted:bg-transparent"
              >
                <Link
                  to="/workspace/$workspaceId"
                  params={{ workspaceId: workspace.workspaceId }}
                >
                  {workspace.workspaceName}
                </Link>
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
