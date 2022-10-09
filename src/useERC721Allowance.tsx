import { XOR } from './types';
import { Contract } from '@ethersproject/contracts';
import { CommonUseAllowanceOptions, useAllowance } from './useAllowance';
import { contractInterfaceERC721 } from './contractInterfaces';
import { BigNumber } from '@ethersproject/bignumber';

export type UseERC721AllowanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & CommonUseAllowanceOptions & {
  tokenId?: BigNumber;
  approvalForAll?: boolean;
}

const allowanceFn = (tokenId?: BigNumber, approvalForAll?: boolean) => async (contract: Contract, account: string, contractAddress: string) => {
  if (approvalForAll) return contract.isApprovedForAll(account, contractAddress);
  if (!tokenId) throw new Error('Can not fetch ERC721 allowance without "tokenId" or "approvalForAll"!');
  return (await contract.getApproved(tokenId)) === contractAddress;
}

export const useERC721Allowance = ({ approvalForAll, tokenId, ...options}: UseERC721AllowanceOptions) => {
  return useAllowance<boolean>({
    ...options,
    contractInterface: contractInterfaceERC721,
    allowanceFn: allowanceFn(tokenId, approvalForAll),
  });
}