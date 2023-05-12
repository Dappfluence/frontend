import React from "react";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import logo from "../assets/logo.png";
import {Button} from "flowbite-react";
import {Link} from "react-router-dom";

interface IProps {
  children?: React.ReactNode;
}

const Footer: React.FC<IProps> = ({children}) => {
  return <div
    className={'fixed z-20 bottom-0 left-0  text-white w-full h-[96px] items-center flex flex-row justify-end py-6 px-20 bg-black rounded-[50px] rounded-b-none'}>
    <div>
      {children}
    </div>
  </div>
}


export default Footer
