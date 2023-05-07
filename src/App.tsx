import React from 'react'
import {RouterProvider} from "react-router-dom";
import router from "./router";
import Header from "./widgets/Header";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {configureChains, createClient, WagmiConfig} from 'wagmi';
import {polygon, mainnet} from "wagmi/chains"
import {publicProvider} from 'wagmi/providers/public';
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
  const particle = new ParticleNetwork({
    projectId: "1bca8c12-8844-4070-ba8c-9571fc32cba5",
    clientKey: "clR7rCoWx6Yv9MzfSCJUGy7ANxiJDRWgVZLSdT5W",
    appId: "6650a17f-78cb-4d7d-9a29-d8c45770acf1",
  });

  const {chains, provider, webSocketProvider} = configureChains(
    [mainnet, polygon],
    [publicProvider()]
  );
  const popularWallets = {
    groupName: 'Popular',
    wallets: [
      particleWallet({chains, authType: 'google'}),
      particleWallet({chains, authType: 'facebook'}),
      particleWallet({chains, authType: 'apple'}),
      particleWallet({chains}),
      injectedWallet({chains}),
      metaMaskWallet({chains}),
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


  return <div className={'w-[100vw] bg-white relative'}>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <ToastContainer position={'bottom-right'} theme={'dark'}/>

          <Header/>
          <RouterProvider router={router}/>

        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </div>
}

export default App
