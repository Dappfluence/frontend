import React, {FC} from 'react';
import {PencilIcon} from "@heroicons/react/24/outline";
import Card from "./Card";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const BrandCard: FC<IProps> = ({children, className = ''}) => {
  return (
    <Card className={'col-span-2'}>
      <img src={'https://via.placeholder.com/250x70'} alt=""/>
      <div className={'flex flex-col gap-1'}>
        <span className={'text-sm'}>Company Name</span>
        <h3 className={'text-xl font-bold'}>Gucci</h3>
      </div>
      <div className={'flex flex-col gap-1'}>
        <span className={'text-sm'}>Company Link</span>
        <a className={'text-xl text-sky-600 font-bold'}>https://gucci.com</a>
      </div>
      <PencilIcon className={'w-6 h-6 opacity-40'}/>
    </Card>
  );
};

export default BrandCard;
