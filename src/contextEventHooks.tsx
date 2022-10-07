import React from 'react';
import { BaseProvider, Network } from "@ethersproject/providers";
import { useLatest } from "react-use";


export type AccountChangeFn = (accounts: string[]) => void;
export type NetworkChangeFn = (network: Network, oldNetwork?: Network) => void;

export interface UseWeb3UseContextOptions {
  onAccountChange?: AccountChangeFn;
  onNetworkChange?: NetworkChangeFn;
}

export const createProviderEventHooks = ({ provider, onAccountChange, onNetworkChange }: { provider: BaseProvider, onAccountChange?: AccountChangeFn, onNetworkChange?: NetworkChangeFn }) => {

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

  const { onAccountChange, onNetworkChange } = options ?? {};
  
  const accountChangeFn = useLatest(onAccountChange);
  const networkChangeFn = useLatest(onNetworkChange);
  
  const hasAccountChangeFn = !!onAccountChange;
  const hasNetworkChangeFn = !!onNetworkChange;
  
  
  React.useEffect(() => {
    if (!provider) return;
  
    const unsubscribe = createProviderEventHooks({ provider, onAccountChange: accountChangeFn.current, onNetworkChange: networkChangeFn.current });
    return unsubscribe;
  
  }, [provider, networkChangeFn, accountChangeFn, hasAccountChangeFn, hasNetworkChangeFn]);
}
