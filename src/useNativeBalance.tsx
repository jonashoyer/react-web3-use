import { CommonUseBalanceOptions } from './useBalance';
import { useWeb3AsyncRetry } from './useWeb3AsyncRetry';

export type UseNativeBalanceOptions = CommonUseBalanceOptions;

export const useNativeBalance = (options?: UseNativeBalanceOptions) => {

  const { accountAddress, ...rest } = options ?? {};

  const { retry: refetch, value: balance, loading, error } = useWeb3AsyncRetry(async ({ provider, signer, account: ctxAccount }) => {
    const accountParam = ctxAccount ?? accountAddress;
    if ((!accountParam && !signer) || (!provider && accountParam)) {
      return undefined;
    }


    if (accountParam) {
      return provider!.getBalance(accountParam);
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