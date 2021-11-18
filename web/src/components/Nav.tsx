import React, { ReactElement } from 'react'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Spacer, Flex, Box, Text } from "@chakra-ui/react"
import Button from './Button';
import EthBalance from './ETHBalance';
import KEthBalance from './KETHBalance';
import useEagerConnect from '../hooks/useEagerConnect';

function Nav(): ReactElement {
  const {active, account, activate, deactivate} = useWeb3React();
  const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42, 1337] });

  useEagerConnect();

  return (
    <Flex className="">
        <EthBalance />
        <KEthBalance />
        <Spacer />
        { 
          active && <Box mr="4">
            <Text fontSize="md" p="2">{account?.substr(0, 8) + ".."}</Text>
          </Box>
        }
        <Box>
          {!active 
            ? 
              <Button message="Connect" action={activate} connector={injected} />
            : 
              <Button message="Disconnect" action={deactivate} connector={injected} />
          }
        </Box>
    </Flex>
  )
}

export default Nav
