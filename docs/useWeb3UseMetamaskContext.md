# `useWeb3UseMetamaskContext`

Metamask integration wrapper for [`useWeb3UseContext`](./useWeb3UseContext.md)

## Usage

```jsx
import React from 'react';
import { Web3UseMetamaskContextProvider, useWeb3UseMetamaskContext } from 'web3-use';


const ComponentA = () => {

  const { connect, connectLoading, notInstalled, account } = useWeb3UseMetamaskContext();

  return (
    <div>
      {notInstalled && <strong>Please instal metamask!</strong>}
      <strong>Address</strong>: <span>{address ? address : '-'}</span>
      {!account && <button onClick={connect}>{connectLoading ? '...' : 'Connect'}</button>}
    </div>
  );
};

const Demo = () => {
  return (
    <Web3UseMetamaskContextProvider>
      <ComponentA />
    </Web3UseMetamaskContextProvider>
  );
};
```