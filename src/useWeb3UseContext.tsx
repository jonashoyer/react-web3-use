import React from 'react';
import { JsonRpcSigner, Network, BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import { MaybeFunction } from './types';
import { useMountedState } from 'react-use';
import { createProviderEventHooks, useProviderEventWrap, UseWeb3UseContextOptions } from './contextEventHooks';

export type Web3UseContextValue = {
  provider: JsonRpcProvider | BaseProvider | undefined;
  account: string | undefined;
  signer: JsonRpcSigner | undefined;
  network: Network | undefined;
  loading: boolean;
  unsupportedChain: boolean;
}

export const Web3UseContext = React.createContext<Web3UseContextValue>({
  provider: undefined,
  account: undefined,
  signer: undefined,
  network: undefined,
  loading: false,
  unsupportedChain: false,
});


export function useWeb3UseContext(options?: UseWeb3UseContextOptions) {
  const ctx = React.useContext(Web3UseContext);
  useProviderEventWrap(ctx.provider, options);
  return ctx;
}

export const Web3UseContextProvider: React.FC<{ children: React.ReactNode, provider: MaybeFunction<JsonRpcProvider | BaseProvider | undefined>, account?: MaybeFunction<string | undefined>, supportedChainIds?: number[] }> = ({ children, provider: outerProvider, account: outerAccount, supportedChainIds }) => {

  const provider = typeof outerProvider == 'function' ? outerProvider() : outerProvider;
  const account = typeof outerAccount == 'function' ? outerAccount() : outerAccount;

  const [network, setNetwork] = React.useState<Network>();
  const [providerAccount, setProviderAccount] = React.useState<string>();


  const lastCallId = React.useRef(0);
  const isMounted = useMountedState();
  const [loading, setLoading] = React.useState(false);

  const signer = React.useMemo(() => {

    try {
      if (provider instanceof JsonRpcProvider) {
        return provider?.getUncheckedSigner?.();
      }
    } catch {}

    return undefined;
  }, [provider]);

  React.useEffect(() => {
    if (!provider) return;

    const unsubscribe = createProviderEventHooks({
      provider,
      onAccountChange(accounts) {
        setProviderAccount(accounts[0]);
      },
      onNetworkChange(network) {
        setNetwork(network);
      },
    });

    return unsubscribe;
  }, [provider]);

  React.useEffect(() => {
    
    (async () => {
      if (!provider) return;

      setLoading(true);

      const callId = ++lastCallId.current;

      const [network, accounts] = await Promise.all([
        provider.getNetwork(),
        (provider as JsonRpcProvider).send?.('eth_requestAccounts', []).catch(() => ([])),
      ]);
      if (!isMounted() || callId !== lastCallId.current) return;

      setLoading(false);
      setNetwork(network);
      setProviderAccount(accounts[0]);
    })();
    
  }, [isMounted, provider]);

  const unsupportedChain = React.useMemo(() => {
    if (!supportedChainIds || !network) return false;
    return !supportedChainIds.includes(network.chainId);
  }, [network, supportedChainIds]);


  return (
    <Web3UseContext.Provider
      value={{
        signer,
        provider,
        loading,
        account: account ?? providerAccount,
        network,
        unsupportedChain,
      }}
    >
      {children}
    </Web3UseContext.Provider>
  )
}
