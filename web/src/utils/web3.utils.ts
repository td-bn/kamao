import { ethers } from "ethers";
import { abi } from "../artifacts/contracts/interfaces/IVault.sol/IVault.json";

const ADDRESS = "";

function web3Provider(): ethers.providers.JsonRpcProvider {
  return new ethers.providers.JsonRpcProvider();
}

function web3Signer(): ethers.Signer {
  const provider = web3Provider();
  return provider.getSigner();
}

function contractInstance(): ethers.Contract {
  return new ethers.Contract(ADDRESS, abi, web3Provider());
}

export {web3Provider, web3Signer, contractInstance}