import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
// import * as Kamao from './artifacts/contracts/protocol/Kamao.sol/Kamao.json'

import React from 'react'
import Button from './Button';
import Main from './Main';

// const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// let provider: ethers.providers.Web3Provider;
// let signer: ethers.Signer;
// let account: string;
// let contract: any;

function Container() {
  const web3React = useWeb3React();
  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

  return (
    <>
    <nav className="App-header nav-wrapper">
      <div>
        <ul className="right">
          <li>
            {web3React.account}
          </li>
          <li>
            {!web3React.active 
              ? 
                <Button message="Connect" action={web3React.activate} connector={injected} />
              : 
                <Button message="Disconnect" action={web3React.deactivate} connector={injected} />
            }
      </li></ul>
      </div>
    </nav>
    <div className="App container">
      <Main />
    </div>
    </>
  );
}

export default Container
