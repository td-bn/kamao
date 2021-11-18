import { Flex, HStack, Spacer } from '@chakra-ui/react';
import React, { ReactElement } from 'react'
import Deposit from './Deposit'
import Withdraw from './Withdraw'

interface Props {
  
}

// eslint-disable-next-line no-empty-pattern
function Main({}: Props): ReactElement {
  
  return (
    <Flex>
      <Spacer />
      <Deposit />
      <Spacer />
      <Withdraw />
      <Spacer />
    </Flex>
  )
}

export default Main
