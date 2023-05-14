import React, {FC} from 'react';
import classNames from "classnames";

interface IProps {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: FC<IProps> = ({children, className = '', onClick = () => {}}) => {
  return (
    <div onClick={onClick}
      className={classNames('border-2 border-gray-200 bg-white rounded-[32px] p-8 flex flex-row justify-between items-center gap-1', className)}>
      {children}
    </div>
  );
};

export default Card;
