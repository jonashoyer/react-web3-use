import { useWeb3UseContext } from "./useWeb3UseContext";
import { Contract, ContractInterface } from '@ethersproject/contracts';

export interface UseContractOptions {
  address: string;
  contractInterface: ContractInterface;
}

export const useContract = ({ address, contractInterface }: UseContractOptions) => {
  const { provider, signer } = useWeb3UseContext();
  return new Contract(address, contractInterface, signer ?? provider);
}