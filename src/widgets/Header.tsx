import React from "react";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import logo from "../assets/logo.png";
import {authentication} from "../main";
import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";



const Header: React.FC = () => {
  const loginWithTwitter = ()=> {
    const provider = new TwitterAuthProvider();
    signInWithPopup(authentication, provider).then((re) => {
      alert(re.user.displayName);
    }).catch(err => {
      console.error(err)
    })
  }

  return <div className={'mb-[96px]'}>
    <div
      className={'fixed z-20 top-0  text-white w-full h-[96px] items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-t-none'}>
      <div className={'flex flex-row gap-3 justify-start items-center'}>
        <img src={logo} alt=""/>
        <h1 className={'text-2xl'}>CollabY</h1>
      </div>
      <div>
        <button className={'text-white p-2 border rounded-lg'} onClick={loginWithTwitter}>Login with Twitter</button>
      </div>
    </div>
  </div>
}


export default Header
