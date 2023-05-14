import React, {FC} from 'react';


interface Props {
  name: string;
  email: string
}
const Representative: FC<Props> = ({name, email}) => {
  return (
    <div className={'flex py-3 items-center'}>
      <div className={'rounded-full p-6 border'}></div>
      <div className={'grow ml-4'}>
        <h4 className={'text-base font-semibold'}>{name}</h4>
        <p className={'text-xs'}>{email}</p>
      </div>
      <button>123</button>
    </div>
  );
};

export default Representative;
