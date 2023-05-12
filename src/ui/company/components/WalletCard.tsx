import React, {FC} from 'react';
import classNames from "classnames";
import {Button} from "flowbite-react";
import Card from "./Card";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const WalletCard: FC<IProps> = ({children, className = ''}) => {
  return (
    <Card className={'col-span-1'}>
      <Button className={'mx-auto'} outline={true} gradientDuoTone="purpleToBlue">Connect your wallet</Button>
    </Card>
  );
};

export default WalletCard;
