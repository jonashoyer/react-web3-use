# `useERC721Allowance`

Retrieve the ERC721 token allowance for the active or specified account.

## Usage

```jsx
import { useERC721Allowance } from 'web3-use';

const Demo = () => {

  const { contract, allowance, loading, refetch } = useERC721Allowance({ tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7', contractAddress: '0xbb34b2adb9a4e35915cc96081f5ec02af054cff3' });


  return (
    <div>
      <strong>Contract Allowance</strong>: <span>{loading ? 'Loading...' : (allowance ? 'Yes' : 'No')}</span> <br />
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
} = useERC721Allowance({
  tokenId,
  tokenAddress,
  tokenContract,
  contractAddress,
  accountAddress,
  allowUnsupportedChain,
  disableRefetchOnNetworkChange,
  skip,
});
```
- `contract: Contract` &mdash; the ERC721 contract of the `contractAddress`
- `allowance: boolean` &mdash; whether the contract has allowance for the specified token or all tokens for that contract
- `loading: boolean` &mdash; whether allowance is loading
- `refetch: () => void` &mdash; refetch allowance<br><br>
- `tokenId?: BigNumber` &mdash; the id of the specified token
- `tokenAddress: string` &mdash; the address of the ERC721 token
- `tokenContract: Contract` &mdash; an ERC721 token contract instance, either `tokenAddress` or `tokenContract`, must be specified
- `contractAddress: string` &mdash; the contract address of the ERC721 contract
- `accountAddress?: string` &mdash; the account address of the allowance to fetch. Default to active account in [`Web3UseContext`](./useWeb3UseContext.md)
- `allowUnsupportedChain?: boolean` &mdash; if `true`, even if the [`Web3UseContext`](./useWeb3UseContext.md) does not support the current chain, data will still be fetched
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched