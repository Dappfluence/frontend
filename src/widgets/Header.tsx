import React from "react";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import logo from "../assets/logo.png";


const Header: React.FC = () => {

  return <div
    className={' absolute z-[10] top-0  text-white w-full max-h-64 items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-t-none'}>
    <div className={'flex flex-row gap-3 justify-start items-center'}>
      <img src={logo} alt=""/>
      <h1 className={'text-2xl'}>CollabY</h1>
    </div>

    <div>
      <ConnectButton/>
    </div>
  </div>
}


export default Header
