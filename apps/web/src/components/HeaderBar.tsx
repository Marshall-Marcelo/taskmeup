import { cn } from 'cn';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link } from '@tanstack/react-router';

type Props = {
  className?: string;
};

const HeaderBar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'shadow-xl px-2 py-4 flex flex-row justify-between',
        className,
      )}
    >
      <HeaderDropdown />
      HeaderBar
    </div>
  );
};

const HeaderDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<span>Click me</span>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to="/workspace/new">Create new workspace</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderBar;
