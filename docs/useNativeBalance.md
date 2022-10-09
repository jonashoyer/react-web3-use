# `useNativeBalance`

Retrieve the balance for the active or specified account.

## Usage

```jsx
import { useNativeBalance } from 'web3-use';
import { formatEther } from '@ethersproject/units';

const Demo = () => {

  const { value: balance, loading } = useNativeBalance();


  return (
    <div>
      <strong>ETH</strong>: <span>{loading ? 'Loading...' : formatEther(balance)}</span> <br />
    </div>
  );
};
```

## Reference

```jsx
const { contract, balance, loading, refetch } = useNativeBalance({ accountAddress, disableRefetchOnNetworkChange, skip });
```
- `value?: BigNumber` &mdash; the amount of ERC20 held by the active account as defined by the [`Web3UseContext`](./useWeb3UseContext.md)
- `error?: Error` &mdash;
- `loading: boolean` &mdash; whether balance is loading
- `refetch: () => void` &mdash; refetch balance<br><br>
- `accountAddress?: string` &mdash; the account address of the allowance to fetch. Default to active account in [`Web3UseContext`](./useWeb3UseContext.md)
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched