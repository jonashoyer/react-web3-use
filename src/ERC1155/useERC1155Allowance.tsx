import { XOR } from '../types';
import { Contract } from '@ethersproject/contracts';
import { useAllowance } from '../common/useAllowance';
import { abiERC1155 } from '../abis';

export type UseERC1155AllowanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
  contractAddress: string;
}

const allowanceFn = async (contract: Contract, account: string, contractAddress: string) => {
  return contract.isApprovedForAll(contractAddress, true);
}

export const useERC1155Allowance = (options: UseERC1155AllowanceOptions) => {
  return useAllowance<boolean>({
    ...options,
    abi: abiERC1155,
    allowanceFn,
  });
}