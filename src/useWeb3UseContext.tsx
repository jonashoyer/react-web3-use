import React from 'react';
import { Web3Provider, JsonRpcSigner, Network } from '@ethersproject/providers';

export type Web3UseContextValue = {
  provider: Web3Provider | undefined;
  signer: JsonRpcSigner | undefined;
  network: Network | undefined;
}

export const Web3UseContext = React.createContext<Web3UseContextValue>({
  provider: undefined,
  signer: undefined,
  network: undefined,
});

export function useWeb3UseContext() {
  return React.useContext(Web3UseContext);
}

export const Web3UseContextProvider: React.FC<{ children: React.ReactNode, getProvider: () => Web3Provider | undefined }> = ({ children, getProvider }) => {

  const provider = getProvider();

  const [network, setNetwork] = React.useState<Network>();

  const signer = React.useMemo(() => {
    return provider?.getUncheckedSigner();
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


  return (
    <Web3UseContext.Provider
      value={{
        signer,
        provider,
        network,
      }}
    >
      {children}
    </Web3UseContext.Provider>
  )
}
