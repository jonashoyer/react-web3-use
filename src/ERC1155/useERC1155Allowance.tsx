import { XOR } from '../types';
import { Contract } from '@ethersproject/contracts';
import { useAllowance } from '../common/useAllowance';
import { contractInterfaceERC1155 } from '../contractInterfaces';

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
    contractInterface: contractInterfaceERC1155,
    allowanceFn,
  });
}