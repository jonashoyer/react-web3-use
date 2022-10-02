import React from 'react';
import { useContract } from '../useContract';
import { XOR } from '../types';
import { Contract } from '@ethersproject/contracts';
import { useERC20Allowance } from './useERC20Allowance';
import { useERC20Approval } from './useERC20Approval';
import { useERC20Balance } from './useERC20Balance';
import { abiERC20 } from '../abis';
import { TransactionReceipt } from '@ethersproject/providers';

export type UseERC20Options = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {
  contractAddress: string;
  approvalAmount?: number;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;
}

export const useERC20 = ({ tokenAddress, tokenContract, contractAddress, onApproval, onRevocation }: UseERC20Options) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface: abiERC20 });

  
  const { balance, loading: loadingBalance, refetch: refetchBalance } = useERC20Balance({ tokenContract: contract });
  const { allowance, loading: loadingAllowance, refetch: refetchAllowance } = useERC20Allowance({ tokenContract: contract, contractAddress });
  
  const onApprovalChange = React.useCallback((fn?: (receipt: TransactionReceipt) => void) => {
    return (receipt: TransactionReceipt) => {
      fn?.(receipt);
      refetchAllowance();
    }
  }, [refetchAllowance]);

  const { approvalLoading, approvalRevokeLoading, requestApproval, requestApprovalRevoke } = useERC20Approval({
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

    requestApprovalRevoke,
    approvalRevokeLoading,
  }
}