import { XOR } from '../types';
import { Contract } from '@ethersproject/contracts';
import { useBalance } from '../common/useBalance';
import { contractInterfaceERC20 } from '../contractInterfaces';

export type UseERC20BalanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
};

const balanceFn = (contract: Contract, account: string) => {
  return contract.balanceOf(account);
}

 export const useERC20Balance = (options: UseERC20BalanceOptions) => {
  return useBalance({
    ...options,
    contractInterface: contractInterfaceERC20,
    balanceFn,
  });
}