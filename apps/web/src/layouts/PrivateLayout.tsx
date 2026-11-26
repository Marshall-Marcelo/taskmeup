import React from 'react';
import NavigationBar from '@/components/NavigationBar';
import HeaderBar from '@/components/HeaderBar';
import { useRouterState } from '@tanstack/react-router';

type Props = {
  children: React.ReactNode;
};

const PrivateLayout = ({ children }: Props) => {
  const currentPath = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <div className="flex flex-col min-h-dvh">
      <HeaderBar />
      <main className="flex-1 p-4">{children}</main>
      <div className="h-20"></div>
      <NavigationBar
        currentPath={currentPath}
        className="fixed bottom-4 left-1/2 -translate-x-1/2"
      />
    </div>
  );
};

export default PrivateLayout;
