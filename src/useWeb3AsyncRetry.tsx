import { useWeb3UseContext, Web3UseContextValue } from './useWeb3UseContext';
import { useAsyncRetry } from 'react-use';

export type UseWeb3AsyncRetryOptions = {
  disableRefetchOnNetworkChange?: boolean;
  disableRefetchOnSignerChange?: boolean;
  disableRefetchOnProviderChange?: boolean;
  skip?: boolean;
}

export const useWeb3AsyncRetry = <T,>(fn: (ctx: Web3UseContextValue) => Promise<T>, deps: React.DependencyList, options?: UseWeb3AsyncRetryOptions) => {

  const { disableRefetchOnNetworkChange, disableRefetchOnProviderChange, disableRefetchOnSignerChange, skip } = options ?? {};

  const ctx = useWeb3UseContext();

  return useAsyncRetry(async () => {
    if (skip) return;
    return fn(ctx);
  },
    [
      ...deps,
      skip,
      ctx.provider,
      ctx.signer,
      ...(disableRefetchOnProviderChange ? [] : [ctx.provider]),
      ...(disableRefetchOnSignerChange ? [] : [ctx.signer]),
      ...(disableRefetchOnNetworkChange ? [] : [ctx.network]),
    ],
  );
}