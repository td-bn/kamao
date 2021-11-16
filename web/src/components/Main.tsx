import React, { ReactElement } from 'react'
import { web3Signer } from '../utils/web3.utils'

interface Props {
  
}

// eslint-disable-next-line no-empty-pattern
function Main({}: Props): ReactElement {
  const signer = web3Signer();
  
  return (
    <>
    
    </>
  )
}

export default Main
