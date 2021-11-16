import { InjectedConnector } from '@web3-react/injected-connector'
import React from 'react'

interface ButtonProps {
  message: string,
  action: Function,
  connector: InjectedConnector
}

function Button( {message, action, connector}: ButtonProps) {
  return (
    <button 
      className="waves-effect waves-light btn" 
      onClick={() => {action(connector)}}>
        {message}
    </button>
  )
}

export default Button
