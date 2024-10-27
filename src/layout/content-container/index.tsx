import { PropsWithChildren } from 'react';
import './content-container.scss';

export const ContentContainer = ({ children }: PropsWithChildren) => {
  return <div className="content-container">{children}</div>;
};
