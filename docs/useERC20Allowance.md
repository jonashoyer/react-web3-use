# `useERC20Allowance`

Retrieve the ERC20 token allowance for the active or specified account.

## Usage

```jsx
import { useERC20Allowance } from 'react-web3-use';
import { formatEther } from '@ethersproject/units';

const Demo = () => {

  const { contract, allowance, loading, refetch } = useERC20Allowance({ tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7', contractAddress: '0xbb34b2adb9a4e35915cc96081f5ec02af054cff3' });


  return (
    <div>
      <strong>Contract Allowance</strong>: <span>{loading ? 'Loading...' : formatEther(allowance)}</span> <br />
    </div>
  );
};
```

## Reference

```jsx
const {
  contract,
  allowance,
  loading,
  refetch,
} = useERC20Allowance({
  tokenAddress,
  tokenContract,
  contractAddress,
  accountAddress,
  allowUnsupportedChain,
  disableRefetchOnNetworkChange,
  skip,
});
```
- `contract: Contract` &mdash; the ERC20 contract of the `contractAddress`
- `loading: boolean` &mdash; whether allowance is loading
- `refetch: () => void` &mdash; refetch allowance<br><br>
- `tokenAddress: string` &mdash; the address of the ERC20 token
- `tokenContract: Contract` &mdash; an ERC20 token contract instance, either `tokenAddress` or `tokenContract`, must be specified
- `contractAddress: string` &mdash; the contract address of the ERC20 contract
- `accountAddress?: string` &mdash; the account address of the allowance to fetch. Default to active account in [`Web3UseContext`](./useWeb3UseContext.md)
- `allowUnsupportedChain?: boolean` &mdash; if `true`, even if the [`Web3UseContext`](./useWeb3UseContext.md) does not support the current chain, data will still be fetched
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched