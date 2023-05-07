import React from 'react'
import {RouterProvider} from "react-router-dom";
import router from "./router";
import Header from "./components/Header";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {configureChains, createClient, mainnet, WagmiConfig} from 'wagmi';
import {polygon} from "wagmi/chains"
import { publicProvider } from 'wagmi/providers/public';
import {ToastContainer} from "react-toastify";
import {ParticleNetwork} from "@particle-network/auth";
import {particleWallet} from "@particle-network/rainbowkit-ext";
import {injectedWallet, metaMaskWallet} from "@rainbow-me/rainbowkit/wallets";
import '@rainbow-me/rainbowkit/styles.css';
import {connectorsForWallets, RainbowKitProvider} from "@rainbow-me/rainbowkit";

interface IProps {
  queryClient: QueryClient;
}

const App: React.FC<IProps> = ({queryClient}) => {


  const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, polygon],
    [publicProvider()]
  );
  const popularWallets = {
    groupName: 'Popular',
    wallets: [
      particleWallet({ chains, authType: 'google' }),
      particleWallet({ chains, authType: 'facebook' }),
      particleWallet({ chains, authType: 'apple' }),
      particleWallet({ chains }),
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
    ],
  };

  const connectors = connectorsForWallets([
    popularWallets
  ]);

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
  });



  return <div className={'w-[100vw] h-[100vh] bg-gradient-to-br from-[#371177] via-black to-[#0A090D]'}>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ToastContainer position={'bottom-right'} theme={'dark'}/>
          <div className={'lg:container mx-auto pt-2'}>
            <Header/>
            <RouterProvider router={router}/>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </div>
}

export default App
