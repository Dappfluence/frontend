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

  const account = useAccount();
  const metas = useWalletMetas()
  const ids = useConnectId()
  console.log(account, metas, ids)
  const connectKit = useConnectKit();

  const provider = useParticleProvider();

  useEffect(() => {
    if (!account) return
    const particle = new ParticleNetwork({
      projectId: '1bca8c12-8844-4070-ba8c-9571fc32cba5' as string,
      clientKey: 'clR7rCoWx6Yv9MzfSCJUGy7ANxiJDRWgVZLSdT5W' as string,
      appId: '6650a17f-78cb-4d7d-9a29-d8c45770acf1' as string,
    });
    console.log(particle, particle.auth.userInfo())
  }, [account])

  useEffect(() => {
    async function chainChanged(chain?: Chain) {
      console.log('DEMO-onChainChanged：', chain);
    }

    if (connectKit) {
      connectKit.on('chainChanged', chainChanged);
      connectKit.on('accountsChanged', (accounts) => {
        console.log(accounts)
      });
      connectKit.on('connect', (a) => {
        console.log(a)
      });
      return () => {
        connectKit.removeListener('chainChanged', chainChanged);
      };
    }
  }, [connectKit]);


  return <div className={'mb-[96px]'}>
    <div
      className={'fixed z-20 top-0  text-white w-full h-[96px] items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-t-none'}>
      <div className={'flex flex-row gap-3 justify-start items-center'}>
        <img src={logo} alt=""/>
        <h1 className={'text-2xl'}>CollabY</h1>
      </div>
      <div>
        {
          account ? (
            <div className={'flex gap-2 items-center'}>
              <h1>
                <Link to='/me'>
                  {account}
                </Link>
              </h1>
            </div>
          ) : (
            <ConnectButton/>
          )
        }
      </div>
    </div>
  </div>
}


export default Header
