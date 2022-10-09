import React from 'react';
import { BaseProvider, Network } from "@ethersproject/providers";
import { useLatest } from "react-use";


export type AccountsChangeFn = (accounts: string[]) => void;
export type NetworkChangeFn = (network: Network, oldNetwork?: Network) => void;

export interface UseWeb3UseContextOptions {
  onAccountsChange?: AccountsChangeFn;
  onNetworkChange?: NetworkChangeFn;
}

export const createProviderEventHooks = ({ provider, onAccountChange, onNetworkChange }: { provider: BaseProvider, onAccountChange?: AccountsChangeFn, onNetworkChange?: NetworkChangeFn }) => {

  if (onNetworkChange) provider.on('network', onNetworkChange);

  // Metamask integration
  if (onAccountChange) (provider as any).provider?.on?.('accountsChanged', onAccountChange);

  return () => {
    if (onNetworkChange) provider.off('network', onNetworkChange);

    // Metamask integration
    if (onAccountChange) (provider as any).provider?.off?.('accountsChanged', onAccountChange);
  }
}

export const useProviderEventWrap = (provider: BaseProvider | undefined, options?: UseWeb3UseContextOptions) => {

  const { onAccountsChange, onNetworkChange } = options ?? {};
  
  const accountsChangeFn = useLatest(onAccountsChange);
  const networkChangeFn = useLatest(onNetworkChange);
  
  const hasAccountsChangeFn = !!onAccountsChange;
  const hasNetworkChangeFn = !!onNetworkChange;
  
  
  React.useEffect(() => {
    if (!provider) return;
  
    const unsubscribe = createProviderEventHooks({ provider, onAccountChange: accountsChangeFn.current, onNetworkChange: networkChangeFn.current });
    return unsubscribe;
  
  }, [provider, networkChangeFn, accountsChangeFn, hasAccountsChangeFn, hasNetworkChangeFn]);
}
