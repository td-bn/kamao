import React, { ReactElement, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { BigNumber, BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { Text } from '@chakra-ui/layout';
import type { Web3Provider } from "@ethersproject/providers";
import { getContract } from '../utils/utils';


const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

function KEthBalance(): ReactElement {
  const {account, library, chainId, active} = useWeb3React();
  const [data, setData] = useState(BigNumber.from(0));

  useEffect( () => {
    if (active) {
      getBalance(library, account);
    } else {
      setData(BigNumber.from(0));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, account, library, chainId]);

  const getBalance = async (library: Web3Provider, address: any) => {
    const instance = getContract(chainId, library, address, "Vault");
    const balance = await instance.balanceOf(account);
    setData(balance);
  }

  return <Text fontSize="md" p="2"> kΞ{parseBalance(data ?? 0)}</Text>;
}

export default KEthBalance
