import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./index.css"
import {QueryClient} from "@tanstack/react-query";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App queryClient={queryClient}/>
  </React.StrictMode>,
)
