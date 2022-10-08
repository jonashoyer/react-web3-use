import { useWeb3UseContext, Web3UseContextValue } from './useWeb3UseContext';
import { useAsyncRetry } from 'react-use';

export type UseWeb3AsyncRetryOptions = {
  allowUnsupportedChain?: boolean;
  disableRefetchOnNetworkChange?: boolean;
  disableRefetchOnSignerChange?: boolean;
  disableRefetchOnProviderChange?: boolean;
  skip?: boolean;
}

export const useWeb3AsyncRetry = <T,>(fn: (ctx: Web3UseContextValue) => Promise<T>, deps: React.DependencyList, options?: UseWeb3AsyncRetryOptions) => {

  const { allowUnsupportedChain, disableRefetchOnNetworkChange, disableRefetchOnProviderChange, disableRefetchOnSignerChange, skip } = options ?? {};

  const ctx = useWeb3UseContext();

  return useAsyncRetry(async () => {
    if (skip) return;
    if (!allowUnsupportedChain && ctx.unsupportedChain) return;
    return fn(ctx);
  },
    [
      ...deps,
      skip,
      ctx.provider,
      ctx.signer,
      ctx.account,
      ...(allowUnsupportedChain ? [ctx.unsupportedChain] : []),
      ...(disableRefetchOnProviderChange ? [] : [ctx.provider]),
      ...(disableRefetchOnSignerChange ? [] : [ctx.signer]),
      ...(disableRefetchOnNetworkChange ? [] : [ctx.network]),
    ],
  );
}