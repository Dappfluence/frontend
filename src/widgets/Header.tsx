import React, {useEffect} from "react";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import {
  Chain,
  ConnectButton,
  useAccount,
  useConnectId,
  useConnectKit,
  useParticleProvider,
  useWalletMetas
} from "@particle-network/connect-react-ui";

import '@particle-network/connect-react-ui/dist/index.css';

import {ParticleNetwork} from "@particle-network/auth";


const Header: React.FC = () => {

  return <div className={'mb-[96px]'}>
    <div
      className={'fixed z-20 top-0  text-white w-full h-[96px] items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-t-none'}>
      <div className={'flex flex-row gap-3 justify-start items-center'}>
        <img src={logo} alt=""/>
        <h1 className={'text-2xl'}>CollabY</h1>
      </div>
      <div>
        <ConnectButton/>
      </div>
    </div>
  </div>
}


export default Header
