import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import {QueryClient} from "@tanstack/react-query";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {ToastContainer} from "react-toastify";
import {Buffer as BufferPolyfill} from 'buffer'

declare var Buffer: typeof BufferPolyfill;
globalThis.Buffer = BufferPolyfill

const firebaseConfig = {
  apiKey: "AIzaSyDsfF-fRVH65gzjpxUZmizI3PjWFRB6RfA",
  authDomain: "dappfluence.firebaseapp.com",
  projectId: "dappfluence",
  storageBucket: "dappfluence.appspot.com",
  messagingSenderId: "378671163511",
  appId: "1:378671163511:web:2f3c5b31d98c03be2cfe72"
};

import "react-toastify/dist/ReactToastify.min.css"

// Initialize Firebase
initializeApp(firebaseConfig);

export const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer className={'z-50'} position={'bottom-right'} theme={'dark'}/>
    <App queryClient={queryClient}/>
  </React.StrictMode>,
)
