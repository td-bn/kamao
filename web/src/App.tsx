import React from 'react';
import { Web3ReactProvider } from '@web3-react/core';
import { ChakraProvider } from '@chakra-ui/provider';
import './App.css';
import { ethers } from 'ethers';
import Container from './components/Container';
import theme from '@chakra-ui/theme';

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
      <ChakraProvider theme={theme}>
        <Container />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default App;