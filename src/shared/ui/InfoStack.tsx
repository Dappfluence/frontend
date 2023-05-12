import React, {FC, ReactNode} from 'react';


interface Props {
  title: string;
  description: string | ReactNode;
}
const InfoStack: FC<Props> = ({title, description}) => {
  return (
      <div>
        <p className={'text-xs'}>{title}</p>
        <p className={'text-base font-semibold mt-1'}>{description}</p>
      </div>
  );
};

export default InfoStack;
