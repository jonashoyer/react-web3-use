import { CommonUseBalanceOptions } from './useBalance';
import { useWeb3AsyncRetry } from './useWeb3AsyncRetry';

export type UseNativeBalanceOptions = CommonUseBalanceOptions;

export const useNativeBalance = (options?: UseNativeBalanceOptions) => {

  const { accountAddress, ...rest } = options ?? {};

  const { retry: refetch, value: balance, loading, error } = useWeb3AsyncRetry(async ({ provider, signer }) => {
    if ((!accountAddress && !signer) || (!provider && accountAddress)) {
      return undefined;
    }


    if (accountAddress) {
      return provider!.getBalance(accountAddress);
    }

    return signer!.getBalance();
  },
    [accountAddress],
    rest,
  );


  return {
    balance,
    loading,
    error,
    refetch,
  }
}