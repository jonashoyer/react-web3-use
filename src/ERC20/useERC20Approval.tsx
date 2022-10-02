import { MaxUint256 } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { XOR } from '../types';
import { useApproval } from '../common/useApproval';
import { BigNumber } from '@ethersproject/bignumber';
import { abiERC20 } from '../abis';
import { TransactionReceipt } from '@ethersproject/providers';

export type UseERC20ApprovalOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
  
  contractAddress: string;

  approvalAmount?: BigNumber;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;
}

const approveFn = (contract: Contract, contractAddress: string, approvalAmount?: BigNumber) => {
  return contract.approve(contractAddress, approvalAmount ?? MaxUint256);
}

const revokeFn = (contract: Contract, contractAddress: string) => {
  return contract.approve(contractAddress, 0);
}

export const useERC20Approval = (options: UseERC20ApprovalOptions) => {

  return useApproval<true>({
    ...options,
    abi: abiERC20,
    approveFn,
    revokeFn,
  });
}