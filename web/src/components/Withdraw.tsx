import { Button, Center, Heading, HStack, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, VStack } from '@chakra-ui/react'
import React from 'react'
import { useWeb3React } from '@web3-react/core';
import { getContract } from '../utils/utils';
import { parseEther } from '@ethersproject/units';

const Withdraw = () => {
  const format = (val: any) => `Ξ ` + val
  const parse = (val: any) => val.replace(/^\Ξ/, "")

  const [value, setValue] = React.useState("0.01")
  const {active, chainId, library, account} = useWeb3React();

  const handleWithdraw = async () => {
    const vault = getContract(chainId, library, account, "Vault");
    try {
      console.log(value)
      const signer = library.getSigner();
      const tx = await vault.connect(signer).withdraw(parseEther(value));
      await tx.wait();
      alert("Transaction complete");
    } catch (err) {
      console.log("Error: ", err);
      alert("Error");
    }
  }

  return (
    <Center bg="gray.400" minH="40vh" color="white">
      <VStack>
        <Heading as="h3" size="lg" p="8" >
          Withdraw Eth from vault
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
          <Button 
            disabled={!active} 
            colorScheme="blue" 
            p="4" ml="8" 
            onClick={async () => {await handleWithdraw()}}>
              Withdraw
            </Button>
        </HStack>
      </VStack>
    </Center>
  )
}

export default Withdraw
