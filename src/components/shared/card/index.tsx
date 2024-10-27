import { PropsWithChildren } from 'react';
import './card.scss';

export const Card = ({ children }: PropsWithChildren) => {
  return <div className="card">{children}</div>;
};
