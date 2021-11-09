import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
// import * as Kamao from './artifacts/contracts/protocol/Kamao.sol/Kamao.json'

import React from 'react'

// const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// let provider: ethers.providers.Web3Provider;
// let signer: ethers.Signer;
// let account: string;
// let contract: any;

function Main() {
  const web3React = useWeb3React();
  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] })
  if (!web3React.active) web3React.activate(injected);

  return (
    <>
    <nav className="App-header nav-wrapper">
      <div>
        <ul className="right"><li>
        {!web3React.active 
          ? 
            <button 
              className="waves-effect waves-light btn" 
              onClick={() => {web3React.activate(injected)}}>
                Connect
            </button>
          : 
            <p>{web3React.account}</p>
        }
      </li></ul>
      </div>
    </nav>
    <div className="App container">
    </div>
    </>
  );
}

export default Main
