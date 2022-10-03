import React from "react";
import { useWeb3UseContext } from "./useWeb3UseContext";
import { Contract, ContractInterface } from '@ethersproject/contracts';

export interface UseContractOptions {
  address: string;
  contractInterface: ContractInterface;
}

export const useContract = ({ address, contractInterface }: UseContractOptions) => {
  const { provider, signer } = useWeb3UseContext();
  
  const contract = React.useMemo(() => {
    return new Contract(address, contractInterface, signer ?? provider);
  }, [address, contractInterface, signer, provider])
  
  return contract;
}