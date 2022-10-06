import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { useAsync } from "react-use"
import { useWeb3UseContext } from "./useWeb3UseContext";

export interface useAccountAddressOptions {
  provider?: JsonRpcSigner | JsonRpcProvider | undefined;
}

export const useAccountAddress = ({ provider }: useAccountAddressOptions) => {

  const ctx = useWeb3UseContext();

  const innerProvider = provider ?? ctx.signer ?? ctx.provider;

  return useAsync(async () => {
    if (ctx.account) return ctx.account;

    if (innerProvider instanceof JsonRpcSigner) {
      return innerProvider.getAddress();
    }
    if (innerProvider instanceof JsonRpcProvider) {
      return (await innerProvider.listAccounts())[0];
    }
    return undefined;
  }, [ctx.account, innerProvider]);
}