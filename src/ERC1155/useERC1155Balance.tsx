import { XOR } from '../types';
import { Contract } from '@ethersproject/contracts';
import { useBalance } from '../common/useBalance';
import { abiERC721 } from '../abis';
import { BigNumber } from '@ethersproject/bignumber';

export type UseERC1155BalanceOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  accountAddress?: string;
  tokenId: BigNumber;
};

const balanceFn = (contract: Contract, account: string, tokenId?: BigNumber) => {
  return contract.balanceOf(account, tokenId);
}

export const useERC1155Balance = (options: UseERC1155BalanceOptions) => {
  return useBalance<BigNumber>({
    ...options,
    abi: abiERC721,
    balanceFn,
  });
}