import React, {useEffect} from "react";
import logo from "../assets/logo.png";
import {Link} from "react-router-dom";
import {
  ConnectButton,
  useAccount,
  useParticleProvider,
} from "@particle-network/connect-react-ui";

import '@particle-network/connect-react-ui/dist/index.css';

import {ParticleNetwork} from "@particle-network/auth";
import {shortHandAddress} from "../shared/utils";
import {Dropdown} from "flowbite-react";


const Header: React.FC = () => {

  const account = useAccount();

  useEffect(() => {
    if (!account) return
    const particle = new ParticleNetwork({
      projectId: '1bca8c12-8844-4070-ba8c-9571fc32cba5' as string,
      clientKey: 'clR7rCoWx6Yv9MzfSCJUGy7ANxiJDRWgVZLSdT5W' as string,
      appId: '6650a17f-78cb-4d7d-9a29-d8c45770acf1' as string,
    });
  }, [account])


  return <div className={'mb-[96px]'}>
    <div
      className={'fixed z-20 top-0  text-white w-full h-[96px] items-center flex flex-row justify-between py-6 px-20 bg-black rounded-[50px] rounded-t-none'}>
      <Link to={'/'}>
        <div className={'flex flex-row gap-3 justify-start items-center'}>
          <img src={logo} alt=""/>
          <h1 className={'text-2xl'}>CollabY</h1>
        </div>
      </Link>
      <div>
        {
          account ? (
            <ConnectButton.Custom>
              {({openAccountModal}) => {
                return (
                  <div className={'flex gap-2 items-center'}>
                    <Dropdown label={shortHandAddress(account ?? '', 5)}>
                      <Link to={'/me'}>
                        <Dropdown.Item>
                          Dashboard
                        </Dropdown.Item>
                      </Link>
                      <Dropdown.Divider/>
                      <Dropdown.Item onClick={openAccountModal}>
                        Wallet info
                      </Dropdown.Item>

                    </Dropdown>
                  </div>
                )
              }}
            </ConnectButton.Custom>

          ) : (
            <ConnectButton/>
          )
        }
      </div>
    </div>
  </div>
}


export default Header
