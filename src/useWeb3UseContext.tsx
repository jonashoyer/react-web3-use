import React from 'react';
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';

export type Web3UseContextValue = {
  provider: Web3Provider | undefined;
  signer: JsonRpcSigner | undefined;
}

export const Web3UseContext = React.createContext<Web3UseContextValue>({
  provider: undefined,
  signer: undefined,
});

export function useWeb3UseContext() {
  return React.useContext(Web3UseContext);
}

export const Web3UseContextProvider: React.FC<{ children: React.ReactNode, getProvider: () => Web3Provider | undefined }> = ({ children, getProvider }) => {

  const provider = getProvider();

  const signer = React.useMemo(() => {
    return provider?.getUncheckedSigner();
  }, [provider]);


  return (
    <Web3UseContext.Provider
      value={{
        signer,
        provider,
      }}
    >
      {children}
    </Web3UseContext.Provider>
  )
}
