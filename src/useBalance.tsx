import { useContract } from './useContract';
import { XOR } from './types';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3AsyncRetry } from './useWeb3AsyncRetry';

export interface CommonUseBalanceOptions {
  accountAddress?: string;

  disableRefetchOnNetworkChange?: boolean;
  skip?: boolean;
}

export type UseBalanceOptions<TID = void> = {
  
  contractInterface: ContractInterface;
  balanceFn: (contract: Contract, account: string, tokenId?: TID) => Promise<BigNumber>;
  

} & (TID extends void ? { tokenId?: never } : { tokenId: TID; })
& XOR<{ tokenAddress: string }, { tokenContract: Contract }>
& CommonUseBalanceOptions;

export const useBalance = <TID= void>({ tokenAddress, tokenContract, accountAddress, tokenId, contractInterface, balanceFn, ...rest }: UseBalanceOptions<TID>) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface });

  const { retry: refetch, value: balance, error, loading } = useWeb3AsyncRetry(async ({ signer, account: ctxAccount }) => {
    const accountParam = ctxAccount ?? accountAddress;
    if (!signer && !accountParam) return;
    const account = accountParam ?? (await signer!.getAddress());
    return balanceFn(contract, account, tokenId);
  },
    [accountAddress, balanceFn, contract, tokenId],
    rest,
  );
  
  return {
    contract,
    balance,
    loading,
    error,
    refetch,
  }
}