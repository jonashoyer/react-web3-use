<div align="center">
  <h1>
    <br/>
    <br/>
    👍
    <br />
    react-web3-use
    <br />
    <br />
    <br />
    <br />
  </h1>
</div>

<br />
<br />

A react hook collection of essential [ethers.js](https://docs.ethers.io/v5/) functionality

- **Context**
  - [`useWeb3UseContext`](./docs/useWeb3UseContext.md) &mdash; share the active account's provider, signer, and network information across hooks (required for the majority of hooks)
  - [`useWeb3UseMetamaskContext`](./docs/useWeb3UseMetamaskContext.md) &mdash; metamask wrapper for `useWeb3UseContext`
- **State**
  - [`useContract`](./docs/useContract.md) &mdash; Create a instance of a ethers contract
- **Native**
  - [`useNativeBalance`](`./docs/useNativeBalance.md`) &mdash; acquire the native balance for the active network for the active or specified account
- **ERC20**
  - [`useERC20`](./docs/useERC20.md) &mdash; a hook that combines allowance, approval, and balance
  - [`useERC20Allowance`](./docs/useERC20Allowance.md) &mdash; acquire an ERC20 token allowance for the active or specified account
  - [`useERC20Approval`](./docs/useERC20Approval.md) &mdash; request ERC20 approval or revocation for the active account
  - [`useERC20Balance`](./docs/useERC20Balance.md) &mdash; acquire the balance of the active or specified account's ERC20 token
- **ERC721**
  - [`useERC721`](./docs/useERC721.md) &mdash; a hook that combines allowance, approval, and balance
  - [`useERC721Allowance`](./docs/useERC721Allowance.md) &mdash; acquire an ERC721 token allowance for the active or specified account
  - [`useERC721Approval`](./docs/useERC721Approval.md) &mdash; request ERC721 approval or revocation for the active account
  - [`useERC721Balance`](./docs/useERC721Balance.md) &mdash; acquire the balance of the active or specified account's ERC721 token
- **ERC1155**
  - [`useERC1155`](./docs/useERC1155.md) &mdash; a hook that combines allowance, approval, and balance
  - [`useERC1155Allowance`](./docs/useERC1155Allowance.md) &mdash; acquire an ERC1155 token allowance for the active or specified account
  - [`useERC1155Approval`](./docs/useERC1155Approval.md) &mdash; request ERC1155 approval or revocation for the active account
  - [`useERC1155Balance`](./docs/useERC1155Balance.md) &mdash; acquire the balance of the active or specified account's ERC1155 token
