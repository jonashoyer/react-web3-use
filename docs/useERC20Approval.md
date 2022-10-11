# `useERC20Approval`

Request approval and revocation of ERC20 token allowance. This uses the active account in [`Web3UseContext`](./useWeb3UseContext.md)

## Usage

```jsx
import { useERC20Allowance } from 'react-web3-use';
import { formatEther } from '@ethersproject/units';

const Demo = () => {

  const approvalAmount = parseEther('100');

  const { contract, requestApproval, approvalLoading, requestRevocation, revocationLoading } = useERC20Approval({
    tokenAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    contractAddress: '0xbb34b2adb9a4e35915cc96081f5ec02af054cff3',
    approvalAmount,
    onApproval(receipt) {},
    onRevocation(receipt) {},
  });


  return (
    <div>
      <button onClick={requestApproval} disabled={approvalLoading}>{approvalLoading ? 'Confirm in Metamask' : 'Request Approval'}</button>
      <button onClick={requestRevocation} disabled={revocationLoading}>{approvalLoading ? 'Confirm in Metamask' : 'Revoke Approval'}</button>
    </div>
  );
};
```

## Reference

```jsx
const {
  contract,
  requestApproval,
  approvalLoading,
  requestRevocation,
  revocationLoading,
} = useERC20Approval({
  tokenAddress,
  tokenContract,
  accountAddress,
  contractAddress,
  approvalAmount,
  onApproval,
  onRevocation,
});
```
- `contract: Contract` &mdash; the ERC20 contract of the `contractAddress`
- `requestApproval: (approvalAmount?: BigNumber) => Promise<TransactionReceipt>` &mdash; request that the allowance be set to `approvalAmount`, the amount specified when calling, or MaxUint256 by default
- `approvalLoading: boolean` &mdash; whether approval is loading
- `requestRevocation: () => Promise<TransactionReceipt>` &mdash; request to revoke the contract's approval
- `revocationLoading: boolean` &mdash; whether revocation is loading<br><br>
- `tokenAddress: string` &mdash; the address of the ERC20 token
- `tokenContract: Contract` &mdash; an ERC20 token contract instance, either `tokenAddress` or `tokenContract`, must be specified
- `contractAddress: string` &mdash; the contract address of the ERC20 contract
- `approvalAmount?: BigNumber` &mdash; the approved amount, with MaxUint256 being used by default if unspecified
- `onApproval?: (receipt: TransactionReceipt) => void` &mdash; called when approval is completed
- `onRevocation?: (receipt: TransactionReceipt) => void` &mdash; called when revocation is completed
- `disableRefetchOnNetworkChange?: boolean` &mdash; disable refetch if network changed in [`Web3UseContext`](./useWeb3UseContext.md)
- `skip?: boolean` &mdash; when `true`, the data is not fetched