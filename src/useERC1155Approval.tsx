import { Contract } from '@ethersproject/contracts';
import { XOR } from './types';
import { useApproval } from './useApproval';
import { contractInterfaceERC1155 } from './contractInterfaces';
import { TransactionReceipt } from '@ethersproject/providers';

export type UseERC1155ApprovalOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
  
  contractAddress: string;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;
}

const approveFn = (contract: Contract, contractAddress: string) => {
  return contract.setApprovalForAll(contractAddress, true);
}

const revokeFn = (contract: Contract, contractAddress: string) => {
  return contract.setApprovalForAll(contractAddress, false);
}

export const useERC1155Approval = (options: UseERC1155ApprovalOptions) => {
  return useApproval({
    ...options,
    contractInterface: contractInterfaceERC1155,
    approveFn,
    revokeFn,
  });
}