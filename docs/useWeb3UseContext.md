# `useWeb3UseContext`

Context provider to share the provider and signer of the active account across hooks.

## Usage

```jsx
import React from 'react';
import { useContract } from 'web3-use';
import { parseEther, formatEther } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';


const ComponentA = () => {

  const { provider, signer, network } = useWeb3UseContext();

  const [address, setAddress] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (!signer) return;
    signer.getAddress().then(address => setAddress(address));
  }, [signer]);


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
import { useContract } from 'web3-use';
import { parseEther, formatEther } from '@ethersproject/units';
import { BigNumber } from '@ethersproject/bignumber';


const ComponentA = () => {

  const { provider, signer, network } = useWeb3UseContext();

  const [address, setAddress] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    if (!signer) return;
    signer.getAddress().then(address => setAddress(address));
  }, [signer]);


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

  const account = useAccountAddress({ provider });

  return (
    <Web3UseContextProvider provider={provider}>
      {/* Using metamask selected network */}
      <ComponentA />

      <Web3UseContextProvider provider={ethProvider} account={account}>
        {/* Always using ethereum network */}
        <ComponentA />
      </Web3UseContextProvider>
    </Web3UseContextProvider>
  );
};
```