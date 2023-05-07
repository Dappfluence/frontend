import React, {useMemo} from "react";
import {ArrowPathIcon, ChevronRightIcon, LinkIcon} from "@heroicons/react/24/outline";
import {Button} from "../elements/Button";
import { ConnectButton } from '@rainbow-me/rainbowkit';


interface IButtonState {
  element: React.ReactNode;
  action: () => void;
}

const Header: React.FC = () => {

  return <div
    className={'text-white w-full max-h-64 p-4 items-center border border-red-500  flex flex-row justify-between'}>
    <div>logo</div>
    <div>links</div>

    <div>
      <ConnectButton />
    </div>
  </div>
}


export default Header
