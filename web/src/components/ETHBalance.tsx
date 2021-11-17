import React, { ReactElement, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core';
import { BigNumber, BigNumberish } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { Text } from '@chakra-ui/layout';
import type { Web3Provider } from "@ethersproject/providers";

const parseBalance = (
  value: BigNumberish,
  decimals = 18,
  decimalsToDisplay = 3
) => parseFloat(formatUnits(value, decimals)).toFixed(decimalsToDisplay);

function EthBalance(): ReactElement {
  const {account, library, active} = useWeb3React();
  const [data, setData] = useState(BigNumber.from(0));

  useEffect( () => {
    if (active) {
      getEthBalance(library, account);
    } else {
      setData(BigNumber.from(0));
    }
  }, [active, account, library]);

  const getEthBalance = async (library: Web3Provider, address: any) => {
    const balance = await library.getBalance(address);
    setData(balance);
  }

  return <Text fontSize="md" p="2">Balance: Ξ{parseBalance(data ?? 0)}</Text>;
}

export default EthBalance
