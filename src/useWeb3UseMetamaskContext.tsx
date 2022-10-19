import React from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { hexValue } from '@ethersproject/bytes';
import { useWeb3UseContext, Web3UseContextProvider, Web3UseContextValue } from './useWeb3UseContext';
import { useAsyncFn } from 'react-use';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';
import { useProviderEventWrap, UseWeb3UseContextOptions } from './contextEventHooks';

export interface WatchAsset {
  address: string;
  symbol: string;
  decimals?: number;
  image?: string;
}

export interface Network {
  chainId: number | string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[];
}

export type Web3UseMetamaskContextValue = Omit<Web3UseContextValue, 'provider'> & {
  provider: Web3Provider | undefined;

  connect: (network?: Network | number) => Promise<void>;
  connectLoading?: boolean;
  connectError?: Error;

  watchAsset: AsyncFnReturn<(asset: WatchAsset) => Promise<void>>;

  notInstalled: boolean;
}

const asyncInitial: AsyncFnReturn<() => Promise<void>> = [
  {
    loading: false,
  },
  () => Promise.resolve(),
];

export const Web3UseMetamaskContext = React.createContext<Web3UseMetamaskContextValue>({
  provider: undefined,
  account: undefined,
  signer: undefined,
  network: undefined,
  unsupportedChain: false,

  connect: asyncInitial[1],

  watchAsset: asyncInitial,
  loading: false,

  notInstalled: false,
});


export function useWeb3UseMetamaskContext(options?: UseWeb3UseContextOptions) {
  const ctx = React.useContext(Web3UseMetamaskContext);
  useProviderEventWrap(ctx.provider, options);
  return ctx;
}

export const Web3UseMetamaskContextProvider: React.FC<{ children: React.ReactNode, supportedChainIds?: number[] }> = ({ children, supportedChainIds }) => {

  const provider = React.useMemo(() => {
    if (typeof window == 'undefined') return undefined;
    if (!(window as any).ethereum?.isMetaMask) return undefined;
    return new Web3Provider((window as any).ethereum, 'any');
  }, [])

  return (
    <Web3UseContextProvider provider={provider} supportedChainIds={supportedChainIds}>
      <InnerWeb3UseMetamaskContext children={children} />
    </Web3UseContextProvider>
  )
}

const InnerWeb3UseMetamaskContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const ctx = useWeb3UseContext();

  const provider = ctx.provider as Web3Provider | undefined;

  const [connectState, connect] = useAsyncFn(async (network?: Network | number) => {
    if (!provider) {
      console.warn('Provider is not available, please make sure metamask is installed!');
      return;
    }

    try {
      await provider.send('eth_requestAccounts', []);
      if (!network) return;

      const chainId = typeof network === 'number' ? network : network.chainId;
      await provider.send('wallet_switchEthereumChain', [{ chainId: hexValue(chainId) }]);
    } catch {
      
      if (!network || typeof network == 'number') return;
      await provider.send('wallet_addEthereumChain', [parseNetwork(network)]);
    }
  }, [provider]);

  const watchAsset = useAsyncFn(async ({ address, symbol, decimals = 18, image }: WatchAsset) => {
    provider?.send?.('wallet_watchAsset', [{
      type: 'ERC20',
      options: {
        address,
        symbol,
        decimals,
        image,
      }
    }]);
  }, [provider]);

  const notInstalled = React.useMemo(() => {
    if (typeof window == 'undefined') return false;
      return !(window as any).ethereum?.isMetaMask;
  }, []);

  return (
    <Web3UseMetamaskContext.Provider
      value={{
        ...ctx,
        connect,
        connectLoading: connectState.loading,
        connectError: connectState.error,

        provider,
        watchAsset,
        notInstalled,
      }}
    >
      {children}
    </Web3UseMetamaskContext.Provider>
  )
}

const parseNetwork = (network: Network) => ({
  ...network,
  chainId: hexValue(network.chainId),
})