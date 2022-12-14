import { XOR } from './types';
import { Contract } from '@ethersproject/contracts';
import { CommonUseAllowanceOptions, useAllowance } from './useAllowance';
import { contractInterfaceERC20 } from './contractInterfaces';
import type { BigNumber } from '@ethersproject/bignumber';

export type UseERC20AllowanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & CommonUseAllowanceOptions;

const allowanceFn = (contract: Contract, account: string, contractAddress: string) => {
  return contract.allowance(account, contractAddress);
}

export const useERC20Allowance = (options: UseERC20AllowanceOptions) => {
  return useAllowance<BigNumber>({
    ...options,
    contractInterface: contractInterfaceERC20,
    allowanceFn,
  });
}