import React from 'react';
import { useContract } from './useContract';
import { XOR } from './types';
import { Contract } from '@ethersproject/contracts';
import { contractInterfaceERC20 } from './contractInterfaces';
import { useERC721Balance } from './useERC721Balance';
import { useERC721Allowance } from './useERC721Allowance';
import { useERC721Approval } from './useERC721Approval';
import { TransactionReceipt } from '@ethersproject/providers';

export type UseERC721Options = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  contractAddress: string;
  approvalForAll?: boolean;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;

  disableRefetchOnNetworkChange?: boolean;
  skip?: boolean;
}

export const useERC721 = ({ tokenAddress, tokenContract, contractAddress, approvalForAll, onApproval, onRevocation, ...options }: UseERC721Options) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface: contractInterfaceERC20 });

  const { balance, loading: loadingBalance, refetch: refetchBalance } = useERC721Balance({ tokenContract: contract, ...options });
  const { allowance, loading: loadingAllowance, refetch: refetchAllowance } = useERC721Allowance({ tokenContract: contract, contractAddress, approvalForAll, ...options });

  const onApprovalChange = React.useCallback((fn?: (receipt: TransactionReceipt) => void) => {
    return (receipt: TransactionReceipt) => {
      fn?.(receipt);
      refetchAllowance();
    }
  }, [refetchAllowance]);

  const { approvalLoading, requestRevocation, requestApproval, revocationLoading } = useERC721Approval({
    tokenContract: contract,
    contractAddress, approvalForAll,
    onApproval: onApprovalChange(onApproval),
    onRevocation: onApprovalChange(onRevocation),
  });
  

  return {
    contract,

    balance,
    loadingBalance,
    refetchBalance,

    allowance,
    loadingAllowance,
    refetchAllowance,

    requestApproval,
    approvalLoading,

    requestRevocation,
    revocationLoading,
  }
}