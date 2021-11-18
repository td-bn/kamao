import { Contract } from "@ethersproject/contracts";
import { Web3Provider } from "@ethersproject/providers";
import { Export } from "hardhat-deploy/types";
import deployments from "../artifacts/deployments.json";

type MultiExport = {
  [chainId: string]: {[name: string]: Export};
};

const deploys: MultiExport = deployments;

export const CHAIN_PREFIXES: {[name: string]: string} = {
  1: "mainnet",
  3: "ropsten",
  4: "rinkeby",
  5: "goerli",
  42: "kovan",
  1337: "localhost",
};

export const getContract = (chainId: any, library: Web3Provider, address: any, contractName: string)  => {
  const chain = chainId ? chainId.toString() : '1337';
  const name = CHAIN_PREFIXES[chain];
  const contract = deploys[chain][name].contracts[contractName];
  return new Contract(contract.address, contract.abi, library);
} 