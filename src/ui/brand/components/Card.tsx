import React, {FC} from 'react';
import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  flex?: boolean;
}

const Card: FC<IProps> = ({children, flex= true, className = '', onClick = () => {}}) => {
  return (
    <div onClick={onClick}
      className={classNames('border-2 border-gray-200 bg-white rounded-[32px] p-8 flex-row justify-between items-center gap-1', className, flex && 'flex')}>
      {children}
    </div>
  );
};

export default Card;
