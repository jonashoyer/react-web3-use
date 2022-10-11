# `useERC20Approval`

Retrieve the ERC20 token balance for the active or specified account.

## Usage

```jsx
import { useERC20Balance } from 'react-web3-use';
import { formatEther } from '@ethersproject/units';

const Demo = () => {

  const { balance, loading } = useERC20Balance({
    tokenAddress: '0xbb34b2adb9a4e35915cc96081f5ec02af054cff3',
  });


  return (
    <div>
      <strong>USDT</strong>: <span>{loading ? 'Loading...' : formatEther(balance)}</span> <br />
    </div>
  );
};
```

## Reference

```jsx
const {
  contract,
  balance,
  loading,
  refetch,
} = useERC20Balance({
  tokenAddress,
  tokenContract,
  accountAddress,
  allowUnsupportedChain,
  disableRefetchOnNetworkChange,
  skip,
});
```
- `contract: Contract` &mdash; the ERC20 contract of the `contractAddress`
- `balance: BigNumber | undefined` &mdash; the amount of ERC20 held by the active account as defined by the [`Web3UseContext`](./useWeb3UseContext.md)
- `loading: boolean` &mdash; whether balance is loading
- `refetch: () => void` &mdash; refetch balance<br><br>
- `tokenAddress: string` &mdash; the address of the ERC20 token
- `tokenContract: Contract` &mdash; an ERC20 token contract instance, either `tokenAddress` or `tokenContract`, must be specified
- `accountAddress?: string` &mdash; the account address of the balance to fetch. Default to active account in [`Web3UseContext`](./useWeb3UseContext.md)
- `allowUnsupportedChain?: boolean` &mdash; if `true`, even if the [`Web3UseContext`](./useWeb3UseContext.md) does not support the current chain, data will still be fetched
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched