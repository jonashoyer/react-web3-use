import { XOR } from './types';
import { Contract } from '@ethersproject/contracts';
import { CommonUseBalanceOptions, useBalance } from './useBalance';
import { contractInterfaceERC20 } from './contractInterfaces';

export type UseERC20BalanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & CommonUseBalanceOptions;

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