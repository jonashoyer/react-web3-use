# `useERC20`

This hook offers the features of the [`useERC20Allowance`](./useERC20Allowance.md), [`useERC20Approval`](./useERC20Approval.md), and [`useERC20Balance`](./useERC20Balance.md) hooks.

## Usage

```jsx
import { useERC20 } from 'web3-use';
import { parseEther, formatEther } from '@ethersproject/units';

const Demo = () => {

  const approvalAmount = parseEther('100');

  const {
    balance,
    loadingBalance,
    allowance,
    loadingAllowance,
    requestApproval,
    approvalLoading,
    requestRevocation,
    revocationLoading,
  } = useERC20({
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    contractAddress: '0xbb34b2adb9a4e35915cc96081f5ec02af054cff3',
    approvalAmount,
  });


  return (
    <div>
      <strong>Balance</strong>: <span>{loadingBalance ? 'Loading...' : formatEther(balance)}</span> <br />
      <strong>Contract Allowance</strong>: <span>{loadingAllowance ? 'Loading...' : formatEther(allowance)}</span> <br />
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

```ts
const {
    balance,
    loadingBalance,
    allowance,
    loadingAllowance,
    requestApproval,
    approvalLoading,
    requestRevocation,
    revocationLoading,
  } = useERC20({
    tokenAddress,
    tokenContract,
    contractAddress,
    onApproval,
    onRevocation,
    approvalAmount,
    disableRefetchOnNetworkChange,
    skip,
  });
```
- `balance: BigNumber | null` &mdash; the amount of ERC20 held by the active account as defined by the [`Web3UseContext`](./useWeb3UseContext.md)
- `loadingBalance: boolean` &mdash; whether balance is loading
- `allowance: BigNumber | null` &mdash; the contract's allowance to spend on behalf of the active account
- `loadingAllowance: boolean` &mdash; whether allowance is loading
- `requestApproval: (approvalAmount?: BigNumber) => Promise<TransactionReceipt>` &mdash; request that the allowance be set to `approvalAmount`, the amount specified when calling, or MaxUint256 by default
- `approvalLoading: boolean` &mdash; whether approval is loading
- `requestRevocation: () => Promise<TransactionReceipt>` &mdash; request to revoke the contract's approval
- `revocationLoading: boolean` &mdash; whether revocation is loading
<br />

- `tokenAddress: boolean` &mdash; the addres of the ERC20 token
- `tokenContract: Contract` &mdash; an ERC20 token contract instance, either `tokenAddress` or `tokenContract`, must be specified
- `contractAddress: string` &mdash; the ERC20 token contract spender
- `onApproval?: (receipt: TransactionReceipt) => void` &mdash; called when approval is completed
- `onRevocation?: (receipt: TransactionReceipt) => void` &mdash; called when revocation is completed
- `approvalAmount?: BigNumber` &mdash; the approved amount, with MaxUint256 being used by default if unspecified
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched