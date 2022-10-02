import React from 'react';
import { useContract } from '../useContract';
import { useWeb3UseContext } from '../useWeb3UseContext';
import { XOR } from '../types';
import { Contract, ContractInterface } from '@ethersproject/contracts';

export type UseAllowanceOptions<T> = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {

  abi: ContractInterface;
  allowanceFn: (contract: Contract, account: string, contractAddress: string) => Promise<T>;

  accountAddress?: string;
  contractAddress: string;
}

export const useAllowance = <T,>({ tokenAddress, tokenContract, contractAddress, accountAddress, abi, allowanceFn }: UseAllowanceOptions<T>) => {

  const { signer } = useWeb3UseContext();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface: abi });

  const [allowance, setAllowance] = React.useState<T | null>(null);
  const [loading, setAllowanceLoading] = React.useState(false);

  const fetch = React.useCallback(async () => {
    if (allowance || loading || (!signer && !accountAddress)) return;

    try {

      setAllowanceLoading(true);

      const account = accountAddress ?? (await signer!.getAddress());
      // allowance
      const allowance = await allowanceFn(contract, account, contractAddress);
      setAllowance(allowance);
    } finally {
      setAllowanceLoading(false);
    }

  }, [allowance, loading, signer, accountAddress, allowanceFn, contract, contractAddress]);
  
  
  React.useEffect(() => {
    fetch();
  }, [fetch]);
  
  React.useEffect(() => {
    setAllowance(null);
    setAllowanceLoading(false);
  }, [signer]);
  
  return {
    contract,

    allowance,
    loading,
    refetch: fetch,
  }
}