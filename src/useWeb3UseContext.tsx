import React from 'react';
import { JsonRpcSigner, Network, BaseProvider, JsonRpcProvider } from '@ethersproject/providers';
import { MaybeFunction } from './types';

export type Web3UseContextValue = {
  provider: JsonRpcProvider | BaseProvider | undefined;
  account: string | undefined;
  signer: JsonRpcSigner | undefined;
  network: Network | undefined;
  unsupportedChain: boolean;
}

export const Web3UseContext = React.createContext<Web3UseContextValue>({
  provider: undefined,
  account: undefined,
  signer: undefined,
  network: undefined,
  unsupportedChain: false,
});

export function useWeb3UseContext() {
  return React.useContext(Web3UseContext);
}

export const Web3UseContextProvider: React.FC<{ children: React.ReactNode, provider: MaybeFunction<JsonRpcProvider | BaseProvider | undefined>, account?: MaybeFunction<string | undefined>, supportedChainIds?: number[] }> = ({ children, provider: outerProvider, account: outerAccount, supportedChainIds }) => {

  const provider = typeof outerProvider == 'function' ? outerProvider() : outerProvider;
  const account = typeof outerAccount == 'function' ? outerAccount() : outerAccount;

  const [network, setNetwork] = React.useState<Network>();

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

    const onNetworkChange = (network: Network) => {
      setNetwork(network);
    }

    provider.on('network', onNetworkChange);

    return () => {
      provider.off('network', onNetworkChange);
    }
  }, [provider]);

  React.useEffect(() => {
    provider?.getNetwork().then(network => setNetwork(network));
  }, [provider]);

  const unsupportedChain = React.useMemo(() => {
    if (!supportedChainIds || !network) return false;
    return supportedChainIds.includes(network.chainId);
  }, [network, supportedChainIds]);


  return (
    <Web3UseContext.Provider
      value={{
        signer,
        provider,
        account,
        network,
        unsupportedChain,
      }}
    >
      {children}
    </Web3UseContext.Provider>
  )
}
