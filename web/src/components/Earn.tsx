import { Button } from '@chakra-ui/react'
import { useWeb3React } from '@web3-react/core';
import React, { ReactElement } from 'react'
import { getContract } from '../utils/utils';
import { BigNumber } from 'ethers';

function Earn(): ReactElement {
  const {chainId, library, account} = useWeb3React();
  const earnYield = async() => {
    const vault = getContract(chainId, library, account, "Vault");
    try {
      const signer = library.getSigner();
      const balOfVault = await library.getBalance(vault.address);
      if (balOfVault.gt(BigNumber.from(0))) {
        const tx = await vault.connect(signer).earn();
        const info = await tx.wait();
        console.log(info);
      }
      alert("Transaction complete");
    } catch (err) {
      console.log("Error: ", err);
      alert("Error");
    }
 
  }
  return (
    <Button colorScheme="blue" onClick={async() => {await earnYield()}}>Earn</Button>
  )
}

export default Earn

