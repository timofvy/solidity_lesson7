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
import type { PromiseOrValue } from "../../common";
import type { ERC20, ERC20Interface } from "../../contracts/ERC20";

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
  "0x60806040523480156200001157600080fd5b5060405162000d6438038062000d64833981016040819052620000349162000160565b60006200004285826200027a565b5060016200005184826200027a565b506002805460ff191660ff9390931692909217909155600381905533600081815260056020526040902091909155600480546001600160a01b031916909117905550620003469050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112620000c357600080fd5b81516001600160401b0380821115620000e057620000e06200009b565b604051601f8301601f19908116603f011681019082821181831017156200010b576200010b6200009b565b816040528381526020925086838588010111156200012857600080fd5b600091505b838210156200014c57858201830151818301840152908201906200012d565b600093810190920192909252949350505050565b600080600080608085870312156200017757600080fd5b84516001600160401b03808211156200018f57600080fd5b6200019d88838901620000b1565b95506020870151915080821115620001b457600080fd5b50620001c387828801620000b1565b935050604085015160ff81168114620001db57600080fd5b6060959095015193969295505050565b600181811c908216806200020057607f821691505b6020821081036200022157634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200027557600081815260208120601f850160051c81016020861015620002505750805b601f850160051c820191505b8181101562000271578281556001016200025c565b5050505b505050565b81516001600160401b038111156200029657620002966200009b565b620002ae81620002a78454620001eb565b8462000227565b602080601f831160018114620002e65760008415620002cd5750858301515b600019600386901b1c1916600185901b17855562000271565b600085815260208120601f198616915b828110156200031757888601518255948401946001909101908401620002f6565b5085821015620003365787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610a0e80620003566000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806340c10f191161008c5780639dc29fac116100665780639dc29fac146101a8578063a457c2d7146101bb578063a9059cbb146101ce578063dd62ed3e146101e157600080fd5b806340c10f191461016257806370a082311461017757806395d89b41146101a057600080fd5b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461011557806323b872dd14610127578063313ce5671461013a578063395093511461014f575b600080fd5b6100dc61021a565b6040516100e9919061081d565b60405180910390f35b610105610100366004610887565b6102ac565b60405190151581526020016100e9565b6003545b6040519081526020016100e9565b6101056101353660046108b1565b61033d565b60025460405160ff90911681526020016100e9565b61010561015d366004610887565b610493565b610175610170366004610887565b610524565b005b6101196101853660046108ed565b6001600160a01b031660009081526005602052604090205490565b6100dc6105ee565b6101756101b6366004610887565b6105fd565b6101056101c9366004610887565b6106fa565b6101056101dc366004610887565b610771565b6101196101ef36600461090f565b6001600160a01b03918216600090815260066020908152604080832093909416825291909152205490565b60606000805461022990610942565b80601f016020809104026020016040519081016040528092919081815260200182805461025590610942565b80156102a25780601f10610277576101008083540402835291602001916102a2565b820191906000526020600020905b81548152906001019060200180831161028557829003601f168201915b5050505050905090565b60006001600160a01b03831633036102d7576040516313a633d560e01b815260040160405180910390fd5b3360008181526006602090815260408083206001600160a01b03881680855290835292819020869055518581529192917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a35060015b92915050565b6001600160a01b0383166000908152600560205260408120548211156103765760405163356680b760e01b815260040160405180910390fd5b6001600160a01b03841660009081526006602090815260408083203384529091529020548211156103ba576040516313be252b60e01b815260040160405180910390fd5b6001600160a01b038416600090815260056020526040812080548492906103e2908490610992565b90915550506001600160a01b0383166000908152600560205260408120805484929061040f9084906109a5565b90915550506001600160a01b038416600090815260066020908152604080832033845290915281208054849290610447908490610992565b92505081905550826001600160a01b0316846001600160a01b03166000805160206109b98339815191528460405161048191815260200190565b60405180910390a35060019392505050565b3360009081526006602090815260408083206001600160a01b03861684529091528120805483919083906104c89084906109a5565b90915550503360008181526006602090815260408083206001600160a01b038816808552908352928190205490519081529192917f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910161032b565b6004546001600160a01b0316331461054f57604051635fc483c560e01b815260040160405180910390fd5b6001600160a01b03821661057657604051630178409b60e41b815260040160405180910390fd5b806003600082825461058891906109a5565b90915550506001600160a01b038216600090815260056020526040812080548392906105b59084906109a5565b90915550506040518181526001600160a01b038316906000906000805160206109b9833981519152906020015b60405180910390a35050565b60606001805461022990610942565b6004546001600160a01b0316331461062857604051635fc483c560e01b815260040160405180910390fd5b6001600160a01b03821661064f57604051630178409b60e41b815260040160405180910390fd5b6001600160a01b0382166000908152600560205260409020548111156106885760405163356680b760e01b815260040160405180910390fd5b6001600160a01b038216600090815260056020526040812080548392906106b0908490610992565b9250508190555080600360008282546106c99190610992565b90915550506040518181526000906001600160a01b038416906000805160206109b9833981519152906020016105e2565b3360009081526006602090815260408083206001600160a01b038616845290915281205482111561073e5760405163189dd6af60e31b815260040160405180910390fd5b3360009081526006602090815260408083206001600160a01b0387168452909152812080548492906104c8908490610992565b336000908152600560205260408120548211156107a15760405163356680b760e01b815260040160405180910390fd5b33600090815260056020526040812080548492906107c0908490610992565b90915550506001600160a01b038316600090815260056020526040812080548492906107ed9084906109a5565b90915550506040518281526001600160a01b0384169033906000805160206109b98339815191529060200161032b565b600060208083528351808285015260005b8181101561084a5785810183015185820160400152820161082e565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b038116811461088257600080fd5b919050565b6000806040838503121561089a57600080fd5b6108a38361086b565b946020939093013593505050565b6000806000606084860312156108c657600080fd5b6108cf8461086b565b92506108dd6020850161086b565b9150604084013590509250925092565b6000602082840312156108ff57600080fd5b6109088261086b565b9392505050565b6000806040838503121561092257600080fd5b61092b8361086b565b91506109396020840161086b565b90509250929050565b600181811c9082168061095657607f821691505b60208210810361097657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b818103818111156103375761033761097c565b808201808211156103375761033761097c56feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa264697066735822122034af8b782e028a3eaa8f5fd9d7881ee824a72eabfa58fe07e5904de806f2b71064736f6c63430008120033";

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
