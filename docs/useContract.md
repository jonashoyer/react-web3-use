# `useContract`

Create a instance of a [ethers contract](https://docs.ethers.io/v5/api/contract/contract/)

## Usage

```jsx
import { useContract, contractInterfaceERC20 } from 'web3-use';

const Demo = () => {

  const erc20Contract = useContract({ address: '0xdac17f958d2ee523a2206206994597c13d831ec7', contractInterface: contractInterfaceERC20 });

  // ...
};
```

## Reference

```ts
const contract = useContract({ address, contractInterface });
```
- `contract: Contract` &mdash; [ethers contract](https://docs.ethers.io/v5/api/contract/contract/)
- `address: string` &mdash; address of contract
- `contractInterface: ContractInterface` &mdash; [ethers ABI contract interface](https://docs.ethers.io/v5/api/utils/abi/interface/)
