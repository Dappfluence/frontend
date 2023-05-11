import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import {QueryClient} from "@tanstack/react-query";

// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDsfF-fRVH65gzjpxUZmizI3PjWFRB6RfA",
  authDomain: "dappfluence.firebaseapp.com",
  projectId: "dappfluence",
  storageBucket: "dappfluence.appspot.com",
  messagingSenderId: "378671163511",
  appId: "1:378671163511:web:2f3c5b31d98c03be2cfe72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App queryClient={queryClient}/>
  </React.StrictMode>,
)
