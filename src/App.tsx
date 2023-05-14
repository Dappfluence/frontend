import React from 'react'
import {RouterProvider} from "react-router-dom";
import router from "./router";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ToastContainer} from "react-toastify";

import {BSC, BSCTestnet, Ethereum, EthereumGoerli,} from '@particle-network/common';
import '@rainbow-me/rainbowkit/styles.css';

import {ModalProvider} from '@particle-network/connect-react-ui';
import {WalletEntryPosition} from '@particle-network/auth';

interface IProps {
  queryClient: QueryClient;
}

const App: React.FC<IProps> = ({queryClient}) => {

  return <div className={'w-[100vw] bg-white relative'}>
    <QueryClientProvider client={queryClient}>
      <ModalProvider
        walletSort={['Particle Auth', 'Wallet']}
        particleAuthSort={[
          'twitter',
        ]}
        //TODO: get particle config from https://dashboard.particle.network/
        options={{
          projectId: '1bca8c12-8844-4070-ba8c-9571fc32cba5' as string,
          clientKey:  'clR7rCoWx6Yv9MzfSCJUGy7ANxiJDRWgVZLSdT5W' as string,
          appId: '6650a17f-78cb-4d7d-9a29-d8c45770acf1' as string,
          chains: [
            BSC,
            Ethereum,
            BSCTestnet,
          ],
          particleWalletEntry: {
            displayWalletEntry: false,
            defaultWalletEntryPosition: WalletEntryPosition.BR,
            supportChains: [Ethereum, EthereumGoerli],
          },
        }}
        language="en"
        theme={'light'}
      >
          <ToastContainer position={'bottom-right'} theme={'dark'}/>
          <RouterProvider router={router} />
      </ModalProvider>
    </QueryClientProvider>
  </div>
}

export default App
