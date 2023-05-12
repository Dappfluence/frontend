import React, {FC} from 'react';
import classNames from "classnames";
import {Button} from "flowbite-react";
import Card from "./Card";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useAccount, useBalance} from "wagmi";

interface IProps {
  children?: React.ReactNode;
  className?: string;
}

const WalletCard: FC<IProps> = ({children, className = ''}) => {

  const {address, isConnected} = useAccount()
  return (
    <Card className={'col-span-1'}>
      {!isConnected ? <div className="mx-auto">
          <ConnectButton/>
        </div> :
        <div className={'flex flex-col'}>
          <span>Connected wallet</span>
          <span className={'text-xl font-bold'}>{address?.slice(0, 5)}...{address?.slice(36)}</span>
        </div>}
    </Card>
  );
};

export default WalletCard;
