import { Button, Center, Heading, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from '@chakra-ui/react'
import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../utils/utils';
import { parseEther } from '@ethersproject/units';

const Deposit = () => {
  const format = (val: any) => `Ξ ` + val
  // eslint-disable-next-line no-useless-escape
  const parse = (val: any) => val.replace(/^\Ξ/, "")

  const [value, setValue] = React.useState("0.01")
  const {active, chainId, library, account} = useWeb3React();

  const handleDeposit = async () => {
    const vault = getContract(chainId, library, account, "Vault");
    try {
      const signer = library.getSigner();
      const numValue = parseFloat(value);
      const tx = await vault.connect(signer).deposit(numValue, {value: parseEther(value)});
      await tx.wait();
    } catch (err) {
      console.log("Error: ", err);
      alert("Error");
    }
    alert("Transaction complete");
  }

  return (
    <Center bg="gray.400" minH="40vh" color="white">
      <VStack>
        <Heading as="h3" size="lg" p="8" >
          Deposit Eth into vault
        </Heading>
        <HStack>
          <NumberInput
            mr="4"
            size="md" 
            maxW="40"
            defaultValue={0.01} 
            precision={2} 
            min={0.01}
            max={1000}
            step={0.1}
            onChange={(valueString) => setValue(parse(valueString))}
            value={format(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button disabled={!active} colorScheme="blue" p="4" ml="8" onClick={async () => {await handleDeposit()}}>Deposit</Button>
        </HStack>
      </VStack>
    </Center>
  )
}

export default Deposit
