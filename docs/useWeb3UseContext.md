# `useWeb3UseContext`

Context provider to share the provider and signer of the active account across hooks.

## Usage

```jsx
import React from 'react';
import { Web3UseContextProvider, useWeb3UseContext } from 'web3-use';


const ComponentA = () => {

  const { account, provider, signer, network, loading } = useWeb3UseContext({
    onAccountsChange(accounts) {
      // ...
    },
    onNetworkChange(network, oldNetwork) {
      // ...
    },
  });

  return (
    <div>
      {loading && <p>Loading...</p>}
      <strong>Chain id</strong>: <span>{network ? network.chainId : '-'}</span>
      <strong>Address</strong>: <span>{address ? address : '-'}</span>
    </div>
  );
};

const Demo = () => {

  const provider = React.useMemo(() => {
    return new Web3Provider(window.ethereum);
  }, []);


  return (
    <Web3UseContextProvider provider={provider}>
      <ComponentA />
    </Web3UseContextProvider>
  );
};
```
&nbsp;
&nbsp;
&nbsp;
### Multiple Context Providers
```jsx
import React from 'react';
import { Web3UseContextProvider, useWeb3UseContext } from 'web3-use';


const ComponentA = () => {

  const { provider, account, signer, network } = useWeb3UseContext();


  return (
    <div>
      <strong>Chain id</strong>: <span>{network ? network.chainId : '-'}</span>
      <strong>Address</strong>: <span>{address ? address : '-'}</span>
    </div>
  );
};

const Demo = () => {

  const provider = React.useMemo(() => {
    return new Web3Provider(window.ethereum);
  }, []);

  const ethProvider = React.useMemo(() => {
    return new InfuraProvider('homestead');
  }, []);

  return (
    <Web3UseContextProvider provider={provider}>
      {/* Using provider selected network */}
      <ComponentA />

      <Web3UseContextProvider provider={ethProvider} account={() => useWeb3UseContext().account}>
        {/* Always using ethereum network */}
        <ComponentA />
      </Web3UseContextProvider>
    </Web3UseContextProvider>
  );
};
```