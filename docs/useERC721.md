# `useERC721`

This hook offers the features of the [`useERC721Allowance`](./useERC721Allowance.md), [`useERC721Approval`](./useERC721Approval.md), and [`useERC721Balance`](./useERC721Balance.md) hooks.

## Usage

```jsx
import { useERC721 } from 'web3-use';
import { parseEther, formatEther } from '@ethersproject/units';

const Demo = () => {

  const {
    balance,
    loadingBalance,
    allowance,
    loadingAllowance,
    requestApproval,
    approvalLoading,
    requestRevocation,
    revocationLoading,
  } = useERC721({
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    contractAddress: '0xbb34b2adb9a4e35915cc96081f5ec02af054cff3',
    approvalForAll: true,
  });


  return (
    <div>
      <strong>Balance</strong>: <span>{loadingBalance ? 'Loading...' : formatEther(balance)}</span> <br />
      <strong>Contract Allowance</strong>: <span>{loadingAllowance ? 'Loading...' : (allowance ? 'Yes' : 'No')}</span> <br />
      {allowance && allowance.lt(approvalAmount) &&
        <button onClick={requestApproval} disabled={approvalLoading}>{approvalLoading ? 'Confirm in Metamask' : 'Request Approval'}</button>
      }
      {allowance && allowance.gt(0) &&
        <button onClick={requestRevocation} disabled={revocationLoading}>{approvalLoading ? 'Confirm in Metamask' : 'Revoke Approval'}</button>
      }
    </div>
  );
};
```

## Reference

```jsx
const {
    balance,
    loadingBalance,
    allowance,
    loadingAllowance,
    requestApproval,
    approvalLoading,
    requestRevocation,
    revocationLoading,
  } = useERC721({
    tokenId,
    tokenAddress,
    tokenContract,
    contractAddress,
    onApproval,
    onRevocation,
    approvalForAll,
    allowUnsupportedChain,
    disableRefetchOnNetworkChange,
    skip,
  });
```
- `balance: BigNumber | undefined` &mdash; the amount of ERC721 held by the active account as defined by the [`Web3UseContext`](./useWeb3UseContext.md)
- `loadingBalance: boolean` &mdash; whether balance is loading
- `allowance: booleab | undefined` &mdash; the contract's allowance to spend on behalf of the active account
- `loadingAllowance: boolean` &mdash; whether allowance is loading
- `requestApproval: (approvalForAll?: boolean) => Promise<TransactionReceipt>` &mdash; request allowance for all tokens or the specified token
- `approvalLoading: boolean` &mdash; whether approval is loading
- `requestRevocation: () => Promise<TransactionReceipt>` &mdash; request to revoke the contract's approval
- `revocationLoading: boolean` &mdash; whether revocation is loading<br><br>
- `tokenId?: BigNumber` &mdash; the id of the specified token
- `tokenAddress: string` &mdash; the address of the ERC721 token
- `tokenContract: Contract` &mdash; an ERC721 token contract instance, either `tokenAddress` or `tokenContract`, must be specified
- `contractAddress: string` &mdash; the ERC721 token contract spender
- `onApproval?: (receipt: TransactionReceipt) => void` &mdash; called when approval is completed
- `onRevocation?: (receipt: TransactionReceipt) => void` &mdash; called when revocation is completed
- `approvalForAll?: boolean` &mdash; if this, when requesting approval it does so for all tokens rather than just the one that is specified
- `allowUnsupportedChain?: boolean` &mdash; if `true`, even if the [`Web3UseContext`](./useWeb3UseContext.md) does not support the current chain, data will still be fetched
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched