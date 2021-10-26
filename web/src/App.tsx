import React from 'react';
import './App.css';
import * as Kamao from './artifacts/contracts/Kamao.sol/Kamao.json'
import { ethers } from 'ethers';
import { useState } from 'react';

declare global {
    interface Window {
        ethereum:any;
    }
}
const address = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

let provider: ethers.providers.Web3Provider;
let signer: ethers.Signer;
let account: string;
let contract: any;

if (typeof window.ethereum == 'undefined') {
  window.alert('MetaMask is not installed!');
}


function App() {
  const [connected, setConnected] = useState(false);

  async function connectWeb3() {
    try {
      await window.ethereum.request({method: 'eth_requestAccounts'});
      provider = new ethers.providers.Web3Provider(window.ethereum);
      signer = provider.getSigner();
      account = await signer.getAddress();
      contract = new ethers.Contract(address, Kamao.abi, signer);
      setConnected(true);
      console.log(signer, account, contract);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <nav className="App-header nav-wrapper">
      <div>
        <ul className="right"><li>
        {!connected 
          ? <button className="waves-effect waves-light btn" onClick={() => {connectWeb3()}}>Connect</button>
          : <p>{account}</p>
        }
      </li></ul>
      </div>
    </nav>
    <div className="App container">
    </div>
    </>
  );
}


export default App;