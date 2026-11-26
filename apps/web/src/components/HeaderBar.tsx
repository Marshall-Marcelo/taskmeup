import React from 'react';
import { cn } from 'cn';

type Props = {
  className?: string;
};

const HeaderBar = ({ className }: Props) => {
  return <div className={cn('shadow-xl px-2 py-4', className)}>HeaderBar</div>;
};

export default HeaderBar;
