import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import './App.css';
import { ethers } from 'ethers';
import Main from './components/Main';

declare global {
    interface Window {
        ethereum:any;
    }
}

const getLibrary = (provider: any, connector: any) => {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Main />
    </Web3ReactProvider>
  );
}

export default App;