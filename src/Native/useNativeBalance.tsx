import { useWeb3UseContext } from '../useWeb3UseContext';
import { useAsyncRetry } from 'react-use';

export type UseNativeBalanceOptions = {
  accountAddress?: string;
}

export const useNativeBalance = (options?: UseNativeBalanceOptions) => {

  const { accountAddress } = options ?? {};

  const { provider, signer } = useWeb3UseContext();

  const { retry: refetch, ...state } = useAsyncRetry(async () => {

    if ((!accountAddress && !signer) || (!provider && accountAddress)) {
      return undefined;
    }


    if (accountAddress) {
      return provider!.getBalance(accountAddress);
    }

    return signer!.getBalance();
  },
    [accountAddress, signer, provider],
  );

  return {
    ...state,
    refetch,
  }
}