import React from 'react';
import { Web3Provider, Network } from '@ethersproject/providers';
import { Web3UseContextProvider, Web3UseContextValue } from './useWeb3UseContext';
import { useAsyncFn } from 'react-use';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';

export interface WatchAsset {
  address: string;
  symbol: string;
  decimals?: number;
  image?: string;
}

export type Web3UseContextMetamaskValue = Omit<Web3UseContextValue, 'provider'> & {
  provider: Web3Provider | undefined;

  connect: AsyncFnReturn<(network: Network | number) => Promise<void>>;
  watchAsset: AsyncFnReturn<(asset: WatchAsset) => Promise<void>>;

  notInstalled: boolean;
}

const asyncInitial: AsyncFnReturn<() => Promise<void>> = [
  {
    loading: false,
    error: undefined,
    value: undefined,
  },
  () => Promise.resolve(),
];

export const Web3UseMetamaskContext = React.createContext<Web3UseContextMetamaskValue>({
  provider: undefined,
  account: undefined,
  signer: undefined,
  network: undefined,
  unsupportedChain: false,

  connect: asyncInitial,
  watchAsset: asyncInitial,

  notInstalled: false,
});


export function useWeb3UseContext() {
  return React.useContext(Web3UseMetamaskContext);
}

export const Web3UseContextMetamaskProvider: React.FC<{ children: React.ReactNode, supportedChainIds?: number[] }> = ({ children, supportedChainIds }) => {

  const provider = React.useMemo(() => {
    if (!(window as any).ethereum?.isMetaMask) return undefined
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

  const connect = useAsyncFn(async (network: Network | number) => {
    if (!ctx.provider) {
      console.warn('Provider is not available, please make sure metamask is installed!');
      return;
    }

    try {
      await ctx.provider.send('eth_requestAccounts', []);

      const chainId = typeof network === 'number' ? network : network.chainId;

      await ctx.provider.send('wallet_switchEthereumChain', [{ chainId }]);
    } catch {
      
      if (!network) return;
      await ctx.provider.send('wallet_addEthereumChain', [network]);

    }
  }, [ctx.provider]);

  const watchAsset = useAsyncFn(async ({ address, symbol, decimals = 18, image }: WatchAsset) => {
    ctx.provider?.send?.('wallet_watchAsset', [{
      type: 'ERC20',
      options: {
        address,
        symbol,
        decimals,
        image,
      }
    }]);
  }, [ctx.provider]);

  const notInstalled = React.useMemo(() => {
    return !(window as any).ethereum?.isMetaMask;
  }, []);

  return (
    <Web3UseMetamaskContext.Provider
      value={{
        ...ctx,
        connect,
        watchAsset,
        notInstalled,
      }}
    >
      {children}
    </Web3UseMetamaskContext.Provider>
  )
}
