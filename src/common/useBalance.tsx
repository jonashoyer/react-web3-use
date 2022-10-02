import React from 'react';
import { useContract } from '../useContract';
import { useWeb3UseContext } from '../useWeb3UseContext';
import { XOR } from '../types';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';

export type UseBalanceOptions<TID = void> = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  
  abi: ContractInterface;
  balanceFn: (contract: Contract, account: string, tokenId?: TID) => Promise<BigNumber>;
  
  accountAddress?: string;
} & (TID extends void ? { tokenId?: never } : { tokenId: TID; });

export const useBalance = <TID= void>({ tokenAddress, tokenContract, accountAddress, tokenId, abi, balanceFn }: UseBalanceOptions<TID>) => {

  const { signer } = useWeb3UseContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface: abi });

  const [balance, setBalance] = React.useState<BigNumber | null>(null);
  const [loading, setLoading] = React.useState(false);

  const fetch = React.useCallback(async () => {
    if (balance || loading || (!signer && !accountAddress)) return;

    try {

      setLoading(true);

      const account = accountAddress ?? (await signer!.getAddress());
      const allowance = await balanceFn(contract, account, tokenId);
      setBalance(allowance);
    } finally {
      setLoading(false);
    }

  }, [balance, loading, signer, accountAddress, balanceFn, contract, tokenId]);
  
  
  React.useEffect(() => {
    fetch();
  }, [fetch]);
  
  React.useEffect(() => {
    setBalance(null);
    setLoading(false);
  }, [signer]);
  
  return {
    contract,
    balance,
    loading,
    refetch: fetch,
  }
}