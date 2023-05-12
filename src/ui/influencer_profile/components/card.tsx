import React, {FC} from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card: FC<Props> = ({children, className}) => {
  return (
    <div className={`py-8 px-10 border-2 border-gray-200 rounded-[32px] ${className}`}>
      {children}
    </div>
  );
};

export default Card;
