import React, { ReactElement, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { BigNumber, BigNumberish, Contract } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { Export } from "hardhat-deploy/types";
import { Text } from '@chakra-ui/layout';
import type { Web3Provider } from "@ethersproject/providers";
import deployments from "../artifacts/deployments.json";
import { CHAIN_PREFIXES } from '../utils/utils';


type MultiExport = {
  [chainId: string]: {[name: string]: Export};
};

const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

function KEthBalance(): ReactElement {
  const {account, library, chainId, active} = useWeb3React();
  const [data, setData] = useState(BigNumber.from(0));

  const deploys: MultiExport = deployments;

  const chain = chainId ? chainId.toString() : '1337';
  const name = CHAIN_PREFIXES[chain];
  const vault = deploys[chain][name].contracts["Vault"];

  useEffect( () => {
    if (active) {
      getBalance(library, account);
    } else {
      setData(BigNumber.from(0));
    }
  }, [active, account, library, chainId]);

  const getBalance = async (library: Web3Provider, address: any) => {
    const vault = deploys[chain][name].contracts["Vault"];

    const instance = new Contract(vault.address, vault.abi, library);
    const balance = await instance.balanceOf(account);
    setData(balance);
  }

  return <Text fontSize="md" p="2"> kΞ{parseBalance(data ?? 0)}</Text>;
}

export default KEthBalance
