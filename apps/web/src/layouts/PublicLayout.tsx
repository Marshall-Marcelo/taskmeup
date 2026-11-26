import React from 'react';

type Props = {
  children: React.ReactNode;
};

const PublicLayout = ({ children }: Props) => {
  return <div className="">{children}</div>;
};

export default PublicLayout;
