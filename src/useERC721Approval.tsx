import { AddressZero } from '@ethersproject/constants';
import { Contract } from '@ethersproject/contracts';
import { XOR } from './types';
import { useApproval } from './useApproval';
import type { BigNumber } from '@ethersproject/bignumber';
import { contractInterfaceERC20 } from './contractInterfaces';
import { TransactionReceipt } from '@ethersproject/providers';

export type UseERC721ApprovalOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
  
  tokenId?: BigNumber;
  approvalForAll?: boolean;
  contractAddress: string;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;
}

const approveFn = (approvalForAll?: boolean) => (contract: Contract, contractAddress: string, approvalAmount?: BigNumber, tokenId?: BigNumber) => {
  if (approvalForAll) return contract.setApprovalForAll(contractAddress, true);
  if (!tokenId) throw new Error('Can not approve ERC721 without "tokenId" or "approvalForAll"!');
  return contract.approve(contractAddress, tokenId);
}

const revokeFn = (approvalForAll?: boolean) => (contract: Contract, contractAddress: string, tokenId?: BigNumber) => {
  if (approvalForAll) return contract.setApprovalForAll(contractAddress, false);
  if (!tokenId) throw new Error('Can not revoke ERC721 without "tokenId" or "approvalForAll"!');
  return contract.approve(AddressZero, tokenId);
}

export const useERC721Approval = ({ approvalForAll, ...options }: UseERC721ApprovalOptions) => {

  return useApproval({
    ...options,
    contractInterface: contractInterfaceERC20,
    approveFn: approveFn(approvalForAll),
    revokeFn: revokeFn(approvalForAll),
  });
}