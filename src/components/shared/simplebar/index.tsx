import './simplebar.scss';
import { PropsWithChildren } from 'react';
import SimpleBar from 'simplebar-react';

export const CustomSimplebar = ({ children }: PropsWithChildren) => {
  return <SimpleBar className="custom-simplebar">{children}</SimpleBar>;
};
