import React from 'react';
import { useContract } from '../useContract';
import { MaxUint256 } from '@ethersproject/constants';
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { XOR } from '../types';
import { BigNumber } from '@ethersproject/bignumber';
import { useLatest } from 'react-use';

export type UseApprovalOptions = XOR<{ tokenAddress: string }, { tokenContract: Contract }> & {

  contractInterface: ContractInterface;
  approveFn: (contract: Contract, contractAddress: string, tokenId?: BigNumber, approvalAmount?: BigNumber) => Promise<TransactionResponse>;
  revokeFn: (contract: Contract, contractAddress: string, tokenId?: BigNumber) => Promise<TransactionResponse>;

  onApproval?: (receipt: TransactionReceipt) => void;
  onRevocation?: (receipt: TransactionReceipt) => void;
  
  contractAddress: string;

  approvalAmount?: BigNumber;
  tokenId?: BigNumber;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const useApproval = <AA extends unknown = false>({ tokenContract, tokenAddress, contractAddress, tokenId, approvalAmount, contractInterface, approveFn, revokeFn, onApproval, onRevocation }: UseApprovalOptions) => {

  const latestOnApproval = useLatest(onApproval);
  const latestOnRevocation = useLatest(onRevocation);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const contract = tokenContract ?? useContract({ address: tokenAddress, contractInterface });

  const [approvalLoading, setApprovalLoading] = React.useState(false);
  const [revocationLoading, setRevocationLoading] = React.useState(false);

  const requestApproval = React.useCallback(async (_approvalAmount?: AA extends true ? BigNumber : void): Promise<TransactionReceipt> => {
    try {

      setApprovalLoading(true);

      const res = await approveFn(contract, contractAddress, tokenId, _approvalAmount ?? approvalAmount ?? MaxUint256);

      const receipt = await res.wait();

      latestOnApproval.current?.(receipt);
      return receipt;

    } finally {
      setApprovalLoading(false);
    }
  }, [approvalAmount, approveFn, contract, contractAddress, latestOnApproval, tokenId]);

  const requestRevocation = React.useCallback(async (): Promise<TransactionReceipt> => {
    try {

      setRevocationLoading(true);

      const res = await revokeFn(contract, contractAddress, tokenId);

      const receipt = await res.wait();

      latestOnRevocation.current?.(receipt);
      return receipt;

    } finally {
      setRevocationLoading(false);
    }
  }, [contract, contractAddress, latestOnRevocation, revokeFn, tokenId]);

  return {
    contract,

    requestApproval,
    approvalLoading,

    requestRevocation,
    revocationLoading,
  }
}