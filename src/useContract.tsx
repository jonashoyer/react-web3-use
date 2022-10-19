import React from "react";
import { useWeb3UseContext } from "./useWeb3UseContext";
import { Contract, ContractInterface } from '@ethersproject/contracts';
import type { BaseProvider, JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";

export interface UseContractOptions {
  address: string;
  contractInterface: ContractInterface;

  provider?: JsonRpcProvider | BaseProvider | JsonRpcSigner;
}

export const useContract = ({ address, contractInterface, provider: overrideProvider }: UseContractOptions) => {
  const { provider, signer } = useWeb3UseContext();
  
  const contract = React.useMemo(() => {
    return new Contract(address, contractInterface, overrideProvider ?? signer ?? provider);
  }, [address, contractInterface, signer, provider, overrideProvider])
  
  return contract;
}