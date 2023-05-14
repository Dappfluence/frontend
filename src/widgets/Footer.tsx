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
    className={'fixed z-20 bottom-0 left-0  text-white w-full h-[64px] items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-b-none'}>
      {children}
  </div>
}


export default Footer
