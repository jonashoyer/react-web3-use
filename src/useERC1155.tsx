import React from 'react';
import { useContract } from './useContract';
import { XOR } from './types';
import { Contract } from '@ethersproject/contracts';
import { contractInterfaceERC20 } from './contractInterfaces';
import { useERC1155Balance } from './useERC1155Balance';
import { useERC1155Allowance } from './useERC1155Allowance';
import { useERC1155Approval } from './useERC1155Approval';
import type { BigNumber } from '@ethersproject/bignumber';
import { TransactionReceipt } from '@ethersproject/providers';

export type UseERC1155Options = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  contractAddress: string;
  tokenId: BigNumber;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;

  allowUnsupportedChain?: boolean;
  disableRefetchOnNetworkChange?: boolean;
  skip?: boolean;
}

export const useERC1155 = ({ tokenAddress, tokenContract, contractAddress, tokenId, onApproval, onRevocation, ...options }: UseERC1155Options) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface: contractInterfaceERC20 });

  const { balance, loading: loadingBalance, refetch: refetchBalance } = useERC1155Balance({ tokenContract: contract, tokenId, ...options });
  const { allowance, loading: loadingAllowance, refetch: refetchAllowance } = useERC1155Allowance({ tokenContract: contract, contractAddress, ...options });

  const onApprovalChange = React.useCallback((fn?: (receipt: TransactionReceipt) => void) => {
    return (receipt: TransactionReceipt) => {
      fn?.(receipt);
      refetchAllowance();
    }
  }, [refetchAllowance]);

  const { approvalLoading, revocationLoading, requestApproval, requestRevocation } = useERC1155Approval({
    tokenContract: contract,
    contractAddress,
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