import { XOR } from '../types';
import { Contract } from '@ethersproject/contracts';
import { useBalance } from '../common/useBalance';
import { contractInterfaceERC721 } from '../contractInterfaces';

export type UseERC721BalanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
};

const balanceFn = (contract: Contract, account: string) => {
  return contract.balanceOf(account);
}

export const useERC721Balance = (options: UseERC721BalanceOptions) => {
  return useBalance({
    ...options,
    contractInterface: contractInterfaceERC721,
    balanceFn,
  });
}