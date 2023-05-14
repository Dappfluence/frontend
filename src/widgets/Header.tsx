import React, {useEffect, useState} from "react";
import {ConnectButton} from '@rainbow-me/rainbowkit';
import logo from "../assets/logo.png";
import {authentication} from "../main";
import {TwitterAuthProvider, signInWithPopup, onAuthStateChanged, User} from "firebase/auth";
import firebase from "firebase/compat";
import {Link} from "react-router-dom";


const Header: React.FC = () => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    signInWithPopup(authentication, provider).catch(err => {
      alert(err)
    })
  }
  useEffect(() => {

    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    });
  }, [])

  return <div className={'mb-[96px]'}>
    <div
      className={'fixed z-20 top-0  text-white w-full h-[96px] items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-t-none'}>
      <div className={'flex flex-row gap-3 justify-start items-center'}>
        <img src={logo} alt=""/>
        <h1 className={'text-2xl'}>CollabY</h1>
      </div>
      <div>
        {user !== undefined ? (
          user ? (
            <div className={'flex gap-2 items-center'}>
              <div className={'w-8 h-8 overflow-hidden rounded-full'}>
                <img src={user.photoURL || ''} alt=""/>
              </div>
              <h1>
                <Link to='/me'>
                  {user.displayName}
                </Link>
              </h1>
            </div>
          ) : (
            <button className={'text-white p-2 border rounded-lg'} onClick={loginWithTwitter}>Login with
              Twitter</button>
          )
        ) : (
          <h1>Implement skeleton here</h1>
        )}
      </div>
    </div>
  </div>
}


export default Header
