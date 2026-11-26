import { cn } from 'cn';
import { Home, UserGroup, MessageCircle, ClipboardPen } from 'lucide-react';
import { Link } from '@tanstack/react-router';

type Props = {
  className?: string;
  currentPath: string;
};

const navigationBarItems = [
  {
    icon: <Home size={32} strokeWidth={1.5} />,
    path: '/dashboard',
    name: 'dashboard',
  },
  {
    icon: <UserGroup size={32} strokeWidth={1.5} />,
    path: '/workspace',
    name: 'workspace',
  },
  {
    icon: <MessageCircle size={32} strokeWidth={1.5} />,
    path: '/messages',
    name: 'messages',
  },
  {
    icon: <ClipboardPen size={32} strokeWidth={1.5} />,
    path: '/task',
    name: 'task',
  },
];

const NavigationBar = ({ className, currentPath }: Props) => {
  return (
    <div
      className={cn(
        'flex gap-2 justify-evenly shadow-lg rounded-xl',
        className,
      )}
    >
      {navigationBarItems.map((item) => (
        <NavigationBarItem
          key={item.name}
          icon={item.icon}
          path={item.path}
          name={item.name}
          currentlySelected={currentPath}
        />
      ))}
    </div>
  );
};

interface NavigationBarItemProps {
  icon: React.ReactNode;
  path: string;
  name: string;
  currentlySelected: string;
}

const NavigationBarItem = ({
  icon,
  path,
  name,
  currentlySelected,
}: NavigationBarItemProps) => {
  return (
    <div
      id={name}
      className={cn(
        'p-4 rounded-xl transition-colors duration-200 ease-in-out',
        currentlySelected === path && 'bg-primary text-white',
      )}
    >
      <Link to={path}>{icon}</Link>
    </div>
  );
};

export default NavigationBar;
