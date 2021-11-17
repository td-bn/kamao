import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider } from '@chakra-ui/provider';
import './App.css';
import { ethers } from 'ethers';
import Container from './components/Container';

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
    <ChakraProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <Container />
      </Web3ReactProvider>
    </ChakraProvider>
  );
}

export default App;