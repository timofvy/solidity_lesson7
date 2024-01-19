/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ERC20,
  ERC20Interface,
} from "../../../contracts/01_ERC20.sol/ERC20";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "decimals_",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "totalSupply_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "ApproveForYourself",
    type: "error",
  },
  {
    inputs: [],
    name: "DecreasedAllowanceBelowZero",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "NotAllowedZeroAddress",
    type: "error",
  },
  {
    inputs: [],
    name: "OnlyOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b50604051620022c0380380620022c083398181016040528101906200003791906200029c565b62000053677f5fb35b45fbe4a060c01b620001d060201b60201c565b6200006f6774d577b5dbc0d9c860c01b620001d060201b60201c565b8360009081620000809190620003ec565b506200009d67b4b756818bc1341160c01b620001d060201b60201c565b8260019081620000ae9190620003ec565b50620000cb679f139abcaff0bdae60c01b620001d060201b60201c565b81600260006101000a81548160ff021916908360ff160217905550620001026767a6e1afb0c0a95860c01b620001d060201b60201c565b806003819055506200012567a38315053436ab5560c01b620001d060201b60201c565b80600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506200018567926e71c84e6f904860c01b620001d060201b60201c565b33600460006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555050505050620004c5565b50565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620001fb57600080fd5b815160018060401b0380821115620002185762000217620001d3565b5b601f1960405181603f83601f8701160116810191508082108383111715620002455762000244620001d3565b5b816040528381526020925086838588010111156200026257600080fd5b600091505b838210156200028757828287010151838383010152828201915062000267565b60008385830101528094505050505092915050565b60008060008060808587031215620002b357600080fd5b845160018060401b0380821115620002ca57600080fd5b620002d888838901620001e9565b95506020870151915080821115620002ef57600080fd5b50620002fe87828801620001e9565b935050604085015160ff811681146200031657600080fd5b809250506060850151905092959194509250565b60008160011c905060018216806200034357607f821691505b6020821081036200036457634e487b7160e01b600052602260045260246000fd5b50919050565b806000525060006020600020905090565b601f821115620003cd57600081815260208120601f850160051c81016020861015620003a5578190505b601f850160051c820191505b81811015620003c957828155600181019050620003b1565b5050505b505050565b60008260011b6000198460031b1c19831617905092915050565b815160018060401b03811115620004085762000407620001d3565b5b62000420816200041984546200032a565b846200037b565b60006020809150601f83116001811462000459576000841562000444578387015190505b620004508582620003d2565b865550620004bd565b601f19841662000469866200036a565b60005b828110156200049157858901518255600182019150848601955084810190506200046c565b5085821015620004b1578488015160001960f88860031b161c1981168255505b505060018460011b0185555b505050505050565b611deb80620004d56000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806340c10f191161008c5780639dc29fac116100665780639dc29fac14610228578063a457c2d714610244578063a9059cbb14610274578063dd62ed3e146102a4576100cf565b806340c10f19146101be57806370a08231146101da57806395d89b411461020a576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063313ce56714610170578063395093511461018e575b600080fd5b6100dc6102d4565b6040516100e99190611bbf565b60405180910390f35b61010c60048036038101906101079190611c2f565b6103a2565b6040516101199190611c5b565b60405180910390f35b61012a6105d5565b6040516101379190611c6e565b60405180910390f35b61015a60048036038101906101559190611c7f565b61061b565b6040516101679190611c5b565b60405180910390f35b610178610a63565b6040516101859190611cbb565b60405180910390f35b6101a860048036038101906101a39190611c2f565b610ab6565b6040516101b59190611c5b565b60405180910390f35b6101d860048036038101906101d39190611c2f565b610cae565b005b6101f460048036038101906101ef9190611ccf565b610ff0565b6040516102019190611c6e565b60405180910390f35b610212611075565b60405161021f9190611bbf565b60405180910390f35b610242600480360381019061023d9190611c2f565b611143565b005b61025e60048036038101906102599190611c2f565b611562565b60405161026b9190611c5b565b60405180910390f35b61028e60048036038101906102899190611c2f565b611873565b60405161029b9190611c5b565b60405180910390f35b6102be60048036038101906102b99190611cf2565b611af9565b6040516102cb9190611c6e565b60405180910390f35b60606102ea67c86df87d9d0de87160c01b611bbc565b6102fe67a3f6ced49b939a8d60c01b611bbc565b61031267556488346dffb15060c01b611bbc565b6000805461031f90611d25565b80601f016020809104026020016040519081016040528092919081815260200182805461034b90611d25565b80156103985780601f1061036d57610100808354040283529160200191610398565b820191906000526020600020905b81548152906001019060200180831161037b57829003601f168201915b5050505050905090565b60006103b86739551b29d2e31ff860c01b611bbc565b6103cc675306692a28bdef9860c01b611bbc565b6103e0674afe18c0bbbe8a1b60c01b611bbc565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff160361046d57610427678861ace77791531460c01b611bbc565b61043b67ff3329c26873ce2160c01b611bbc565b6040517f13a633d500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104816796b279e233f602cf60c01b611bbc565b610495673d6ad57d0717292c60c01b611bbc565b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555061052a67c8f7d006073a065960c01b611bbc565b61053e675a38e8018594538960c01b611bbc565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9258460405161059b9190611c6e565b60405180910390a36105b767ea218fd8e76f704d60c01b611bbc565b6105cb67f3f844eefbcbea3f60c01b611bbc565b6001905092915050565b60006105eb67ca70975fb49caea160c01b611bbc565b6105ff67c0a3d58f10ee966f60c01b611bbc565b61061367f3e20b56811baac560c01b611bbc565b600354905090565b6000610631676a7b240c495eb14c60c01b611bbc565b61064567aadd5dd2589968cc60c01b611bbc565b61065967b6a2ccec34af37dc60c01b611bbc565b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156106fa576106b4671d22fbcb6de3b31760c01b611bbc565b6106c8677f02d1fb1494136360c01b611bbc565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61070e670c2ed33613844fe760c01b611bbc565b61072267f6fdfeee9cb166b360c01b611bbc565b6107366742d9aa12960be38460c01b611bbc565b81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610814576107ce67c128639426bda0b260c01b611bbc565b6107e2673ae2c83800e22e0d60c01b611bbc565b6040517f13be252b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61082867c26e8e7b1893a2bc60c01b611bbc565b61083c67fcf2d4fa75f928e260c01b611bbc565b81600560008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461088b9190611d79565b925050819055506108a667bb5ecc02d1799ef760c01b611bbc565b81600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546108f59190611d97565b9250508190555061091067b16f5a3048768fff60c01b611bbc565b81600660008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461099c9190611d79565b925050819055506109b7676589bd63ac79e46f60c01b611bbc565b6109cb67f4eb83614bbff53860c01b611bbc565b8273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610a289190611c6e565b60405180910390a3610a4467e55412fcfc9b28fa60c01b611bbc565b610a586724bc3e49ef7cecc760c01b611bbc565b600190509392505050565b6000610a79678a05042c1d97514760c01b611bbc565b610a8d677620a2b291cf5b6d60c01b611bbc565b610aa1672f2044126e5136e860c01b611bbc565b600260009054906101000a900460ff16905090565b6000610acc673d0ebbe41f8d319b60c01b611bbc565b610ae0674b28b4786a52ca3360c01b611bbc565b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610b6c9190611d97565b92505081905550610b87674004ef88fc8fd13360c01b611bbc565b610b9b67aba995929f9e6aa960c01b611bbc565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054604051610c749190611c6e565b60405180910390a3610c90676885e93e43353e4560c01b611bbc565b610ca467bf7cf9b9471933bf60c01b611bbc565b6001905092915050565b610cc267fc54924db0aaa36460c01b611bbc565b610cd667e13213d243393afb60c01b611bbc565b610cea67ef5d67812a03933560c01b611bbc565b610cfe67a193a4a0acbf2d6460c01b611bbc565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614610dad57610d6767ba18982b8db6154b60c01b611bbc565b610d7b67d87e56b3f533b7e460c01b611bbc565b6040517f5fc483c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610dc1674fce7dfeb1ed318360c01b611bbc565b610dd567d1917de810cc215b60c01b611bbc565b610de967060f640bdc4e9dd060c01b611bbc565b610dfd67c11991f577b2f9a060c01b611bbc565b610e1167331a1f6d422a1d3560c01b611bbc565b610e2567fb9e39afc3400ff260c01b611bbc565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610eb357610e6d67ea4c46fd647ec25560c01b611bbc565b610e816706d4be59250f9bc760c01b611bbc565b6040517f178409b000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610ec767e9a2e3153dff0dc060c01b611bbc565b610edb674de8b6a6a8e4de6f60c01b611bbc565b8060036000828254610eed9190611d97565b92505081905550610f08675c0fcce964a0b63760c01b611bbc565b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610f579190611d97565b92505081905550610f7267eef78bfbcb51f0ce60c01b611bbc565b610f8667ef9fe72e6bb47b5b60c01b611bbc565b8173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610fe49190611c6e565b60405180910390a35050565b6000611006676007e023b30823ca60c01b611bbc565b61101a6728d6916139b02a5660c01b611bbc565b61102e678fe54c390058fe2860c01b611bbc565b600560008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b606061108b674942f203e85f2dd960c01b611bbc565b61109f67cd39af554117e67560c01b611bbc565b6110b36794899d0f1a6ccb4b60c01b611bbc565b600180546110c090611d25565b80601f01602080910402602001604051908101604052809291908181526020018280546110ec90611d25565b80156111395780601f1061110e57610100808354040283529160200191611139565b820191906000526020600020905b81548152906001019060200180831161111c57829003601f168201915b5050505050905090565b6111576740468e96682a90fe60c01b611bbc565b61116b67e13213d243393afb60c01b611bbc565b61117f67ef5d67812a03933560c01b611bbc565b61119367a193a4a0acbf2d6460c01b611bbc565b600460009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614611242576111fc67ba18982b8db6154b60c01b611bbc565b61121067d87e56b3f533b7e460c01b611bbc565b6040517f5fc483c500000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b611256674fce7dfeb1ed318360c01b611bbc565b61126a67d1917de810cc215b60c01b611bbc565b61127e67f89e53413f7ae6a260c01b611bbc565b611292678ef34d801f02990b60c01b611bbc565b6112a6674d2adbb93faf4bda60c01b611bbc565b6112ba67c98bcd00e830e84c60c01b611bbc565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff160361134857611302679cd0b73af65e430860c01b611bbc565b6113166721959f5a06a439a960c01b611bbc565b6040517f178409b000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61135c67a7f992951b6e2c7260c01b611bbc565b611370676a176421a5074e1d60c01b611bbc565b611384675381c8b3eacdef3a60c01b611bbc565b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015611425576113df6764439b3201844c0460c01b611bbc565b6113f367038ec61493c93ca060c01b611bbc565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61143967965df409e9f3ba1260c01b611bbc565b61144d67942351877e1fe67c60c01b611bbc565b80600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825461149c9190611d79565b925050819055506114b767abb31bd1609d280360c01b611bbc565b80600360008282546114c99190611d79565b925050819055506114e46765b60429505901d060c01b611bbc565b6114f867992df50a9d12896f60c01b611bbc565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef836040516115569190611c6e565b60405180910390a35050565b6000611578676995c0224850418760c01b611bbc565b61158c67139570e5ba50cb8f60c01b611bbc565b6115a0672618bb051c2bd87b60c01b611bbc565b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101561167e57611638672f7dbf8f9991234860c01b611bbc565b61164c67f628999f8440f2ae60c01b611bbc565b6040517fc4eeb57800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6116916605dde0d467441c60c01b611bbc565b6116a56775c5c884b4e189eb60c01b611bbc565b81600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546117319190611d79565b9250508190555061174c67290ad6ceafa89cff60c01b611bbc565b611760674bbba4aa4929706060c01b611bbc565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008773ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546040516118399190611c6e565b60405180910390a3611855679b2eaf06f7fbee4460c01b611bbc565b611869677c309589e543e0c760c01b611bbc565b6001905092915050565b600061188967c5887c4902bd385d60c01b611bbc565b61189d678028bcfb1abb12b860c01b611bbc565b6118b167047252e9c3ccbaf160c01b611bbc565b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410156119525761190c678e207210741b492160c01b611bbc565b611920672ed601daa796ac7f60c01b611bbc565b6040517f356680b700000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6119666779003ed52d3f99fb60c01b611bbc565b61197a6749b5c1b531740bf760c01b611bbc565b81600560003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546119c99190611d79565b925050819055506119e467ebdea4e374cee41e60c01b611bbc565b81600560008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254611a339190611d97565b92505081905550611a4e67a016b17eeae09c0960c01b611bbc565b611a626792ed0671de0cfa0060c01b611bbc565b8273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051611abf9190611c6e565b60405180910390a3611adb67079f6d044f81961b60c01b611bbc565b611aef67824cfbdc980162d960c01b611bbc565b6001905092915050565b6000611b0f6720f657c7261b8b3f60c01b611bbc565b611b23673f017db1fafeb15b60c01b611bbc565b611b3767d2f2f7b34d6586a860c01b611bbc565b600660008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b50565b600060208083528351808285015260005b81811015611bef57828187010151604082870101528281019050611bd0565b506000604082860101526040601f19601f8301168501019250505092915050565b60008135905060018060a01b0381168114611c2a57600080fd5b919050565b60008060408385031215611c4257600080fd5b611c4b83611c10565b9150602083013590509250929050565b6000602082019050821515825292915050565b600060208201905082825292915050565b600080600060608486031215611c9457600080fd5b611c9d84611c10565b9250611cab60208501611c10565b9150604084013590509250925092565b600060208201905060ff8316825292915050565b600060208284031215611ce157600080fd5b611cea82611c10565b905092915050565b60008060408385031215611d0557600080fd5b611d0e83611c10565b9150611d1c60208401611c10565b90509250929050565b60008160011c90506001821680611d3d57607f821691505b602082108103611d5d57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b6000828203905081811115611d9157611d90611d63565b5b92915050565b6000828201905080821115611daf57611dae611d63565b5b9291505056fea2646970667358221220522a63977167fd51dcc22bd8cb8f7ec427e25af042d949c765f247ed9d86899264736f6c63430008120033";

type ERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ERC20__factory extends ContractFactory {
  constructor(...args: ERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    decimals_: PromiseOrValue<BigNumberish>,
    totalSupply_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ERC20> {
    return super.deploy(
      name_,
      symbol_,
      decimals_,
      totalSupply_,
      overrides || {}
    ) as Promise<ERC20>;
  }
  override getDeployTransaction(
    name_: PromiseOrValue<string>,
    symbol_: PromiseOrValue<string>,
    decimals_: PromiseOrValue<BigNumberish>,
    totalSupply_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      name_,
      symbol_,
      decimals_,
      totalSupply_,
      overrides || {}
    );
  }
  override attach(address: string): ERC20 {
    return super.attach(address) as ERC20;
  }
  override connect(signer: Signer): ERC20__factory {
    return super.connect(signer) as ERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20Interface {
    return new utils.Interface(_abi) as ERC20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20 {
    return new Contract(address, _abi, signerOrProvider) as ERC20;
  }
}