import { InjectedConnector } from '@web3-react/injected-connector'
import { Button as Btn } from '@chakra-ui/button'
import React from 'react'

interface ButtonProps {
  message: string,
  action: Function,
  connector: InjectedConnector
}

function Button( {message, action, connector}: ButtonProps) {
  return (
    <Btn colorScheme="teal" 
      onClick={() => {action(connector)}}>
        {message}
    </Btn>
  )
}

export default Button
