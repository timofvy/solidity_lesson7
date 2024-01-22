/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  UniswapV3Adapter,
  UniswapV3AdapterInterface,
} from "../../../contracts/00_UniswapV3Adapter.sol/UniswapV3Adapter";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISwapRouter",
        name: "_swapRouter",
        type: "address",
      },
      {
        internalType: "contract INonfungiblePositionManager",
        name: "_nonfungiblePositionManager",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "InvalidLiquidity",
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
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Collect",
    type: "event",
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
        indexed: false,
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    name: "CreatePool",
    type: "event",
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
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "DecreaseLiquidity",
    type: "event",
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
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "IncreaseLiquidity",
    type: "event",
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
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    name: "Mint",
    type: "event",
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
        indexed: false,
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    name: "SwapInput",
    type: "event",
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
        indexed: false,
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    name: "SwapOutput",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "collectAllFees",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "fee",
        type: "uint24",
      },
      {
        internalType: "uint256",
        name: "reserve0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reserve1",
        type: "uint256",
      },
    ],
    name: "createPool",
    outputs: [
      {
        internalType: "address",
        name: "pool",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
    ],
    name: "decreaseLiquidity",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "deposits",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAdd0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountAdd1",
        type: "uint256",
      },
    ],
    name: "increaseLiquidity",
    outputs: [
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token0",
        type: "address",
      },
      {
        internalType: "address",
        name: "token1",
        type: "address",
      },
      {
        internalType: "uint24",
        name: "poolFee",
        type: "uint24",
      },
      {
        internalType: "uint256",
        name: "amount0ToMint",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1ToMint",
        type: "uint256",
      },
      {
        internalType: "int24",
        name: "minTick",
        type: "int24",
      },
      {
        internalType: "int24",
        name: "maxTick",
        type: "int24",
      },
    ],
    name: "mintNewPosition",
    outputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "liquidity",
        type: "uint128",
      },
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinimum",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "path",
        type: "bytes",
      },
    ],
    name: "swapExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountInMaximum",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "path",
        type: "bytes",
      },
    ],
    name: "swapExactOutput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001da538038062001da583398101604081905262000034916200008a565b600280546001600160a01b03199081163317909155600080546001600160a01b0394851690831617905560018054929093169116179055620000c9565b6001600160a01b03811681146200008757600080fd5b50565b600080604083850312156200009e57600080fd5b8251620000ab8162000071565b6020840151909250620000be8162000071565b809150509250929050565b611ccc80620000d96000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063aa08187511610066578063aa0818751461013e578063b02c43d01461015f578063e115bc5c146101e8578063eeee381f14610220578063f1421a0e1461023357600080fd5b8063120cdc211461009857806346ce96dd146100d85780638da5cb5b1461010057806399d7b5941461012b575b600080fd5b6100ab6100a63660046115c7565b610246565b604080519485526001600160801b0390931660208501529183015260608201526080015b60405180910390f35b6100eb6100e636600461164b565b61046f565b604080519283526020830191909152016100cf565b600254610113906001600160a01b031681565b6040516001600160a01b0390911681526020016100cf565b6100eb610139366004611679565b610563565b61015161014c3660046116bf565b610870565b6040519081526020016100cf565b6101ac61016d36600461164b565b600360208190526000918252604090912080546001820154600283015492909301546001600160a01b03918216936001600160801b0316928216911684565b604080516001600160a01b0395861681526001600160801b039094166020850152918416918301919091529190911660608201526080016100cf565b6101fb6101f6366004611796565b610a0e565b604080516001600160801b0390941684526020840192909252908201526060016100cf565b61011361022e3660046117c2565b610c15565b6101516102413660046116bf565b610d24565b600080600080896001600160a01b03168b6001600160a01b0316111561026a579899985b6102768b33308b610e58565b6102828a33308a610e58565b60015461029a908c906001600160a01b03168a610f67565b6001546102b2908b906001600160a01b031689610f67565b60408051610160810182526001600160a01b03808e1682528c8116602083015262ffffff8c1682840152600289810b606084015288900b608083015260a082018b905260c082018a9052600060e0830181905261010083015230610120830152426101408301526001549251634418b22b60e11b81529192169063883164569061034090849060040161181d565b6080604051808303816000875af115801561035f573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061038391906118f1565b9297509095509350915061039685611067565b888310156103d2576001546103b7908d906001600160a01b03166000610f67565b60006103c3848b611945565b90506103d08d3383611213565b505b8782101561040e576001546103f3908c906001600160a01b03166000610f67565b60006103ff838a611945565b905061040c8c3383611213565b505b604080518681526001600160801b03861660208201529081018490526060810183905233907f3cc59bd4dcfda7a268f9ef76b1194008b064cff195b41d27144787d308c3d0649060800160405180910390a250975097509750979350505050565b604080516080810182528281523060208201526001600160801b038183018190526060820152600154915163fc6f786560e01b81526000928392916001600160a01b039091169063fc6f7865906104ca908490600401611958565b60408051808303816000875af11580156104e8573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061050c919061199b565b909350915061051c84848461130c565b60408051858152602081018590529081018390527f8197a21f6433687c876eb0abd2bbe09ec2b9a677ff4af87e87185816ab16b0619060600160405180910390a150915091565b60008281526003602052604081205481906001600160a01b0316331461059c57604051635fc483c560e01b815260040160405180910390fd5b600084815260036020818152604092839020835160808101855281546001600160a01b03908116825260018301546001600160801b039081169483018590526002840154821696830196909652919093015416606083015290918516111561061757604051631fff968160e01b815260040160405180910390fd5b6040805160a0810182528681526001600160801b038681166020830190815260008385018181526060850191825242608086019081526001549651630624e65f60e11b815286516004820152935190941660248401525160448301525160648201529051608482015290916001600160a01b031690630c49ccbe9060a40160408051808303816000875af11580156106b3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d7919061199b565b604080516080810182528981523060208201526001600160801b038183018190526060820152600154915163fc6f786560e01b815293975091955090916001600160a01b039091169063fc6f786590610734908490600401611958565b60408051808303816000875af1158015610752573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610776919061199b565b5050858360200181815161078a91906119bf565b6001600160801b03908116909152600089815260036020818152604092839020885181546001600160a01b03199081166001600160a01b03928316178355928a01516001830180546fffffffffffffffffffffffffffffffff191691909716179095559288015160028401805483169186169190911790556060880151929091018054909116919092161790555061082387868661130c565b604080518881526020810187905290810185905233907f025667fbf734af165d5787ff36099283a5a5a3e63410afd0fe104ade3e75714d9060600160405180910390a25050509250929050565b600061087e85333086610e58565b6000546108969086906001600160a01b031685610f67565b6040805160a081018252838152336020820152428183015260608101869052608081018590526000549151631e51809360e31b815290916001600160a01b03169063f28c0498906108eb908490600401611a87565b6020604051808303816000875af115801561090a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092e9190611a9a565b915061095b60405180604001604052806009815260200168185b5bdd5b9d13dd5d60ba1b81525086611350565b6109836040518060400160405280600681526020016513d55514155560d21b81525083611350565b838210156109b857600080546109a49188916001600160a01b031690610f67565b6109b886336109b38588611945565b611213565b604080516001600160a01b03881681526020810187905290810183905233907fbbae7eb111de428a8901aab34bd8b38b61bfee1d8414d3623e6dbae9dc0fa28b906060015b60405180910390a250949350505050565b600083815260036020526040812054819081906001600160a01b03163314610a4957604051635fc483c560e01b815260040160405180910390fd5b600086815260036020526040902060020154610a70906001600160a01b0316333088610e58565b60008681526003602081905260409091200154610a98906001600160a01b0316333087610e58565b600086815260036020526040902060020154600154610ac4916001600160a01b03908116911687610f67565b60008681526003602081905260409091200154600154610af1916001600160a01b03908116911686610f67565b6040805160c08101825287815260208101878152818301878152600060608401818152608085019182524260a08601908152600154965163219f5d1760e01b81528651600482015294516024860152925160448501525160648401525160848301525160a482015290916001600160a01b03169063219f5d179060c4016060604051808303816000875af1158015610b8d573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb19190611ab3565b604080518b81526001600160801b038516602082015290810183905260608101829052929650909450925033907fb3b8054640c28d1c430b47c2047ae2618002580bb260cbe11797cc909b1aec089060800160405180910390a25093509350939050565b6000846001600160a01b0316866001600160a01b03161115610c35579394935b6001546001600160a01b03166313ead562878787610c538888611399565b6040516001600160e01b031960e087901b1681526001600160a01b039485166004820152928416602484015262ffffff90911660448301529190911660648201526084016020604051808303816000875af1158015610cb6573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610cda9190611af5565b6040516001600160a01b038216815290915033907fdbd2a1ea6808362e6adbec4db4969cbc11e3b0b28fb6c74cb342defaaf1daada9060200160405180910390a295945050505050565b6000610d3285333087610e58565b600054610d4a9086906001600160a01b031686610f67565b6040805160a08101825283815233602082015242818301526060810186905260808101859052600054915163c04b8d5960e01b815290916001600160a01b03169063c04b8d5990610d9f908490600401611a87565b6020604051808303816000875af1158015610dbe573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610de29190611a9a565b9150610e0f60405180604001604052806009815260200168185b5bdd5b9d13dd5d60ba1b81525083611350565b604080516001600160a01b03881681526020810187905290810183905233907fbabb8c2585e878329bab9491a7c9e81c5601ec1347faaa8bdd00811acf3cb693906060016109fd565b604080516001600160a01b0385811660248301528481166044830152606480830185905283518084039091018152608490920183526020820180516001600160e01b03166323b872dd60e01b1790529151600092839290881691610ebc9190611b12565b6000604051808303816000865af19150503d8060008114610ef9576040519150601f19603f3d011682016040523d82523d6000602084013e610efe565b606091505b5091509150818015610f28575080511580610f28575080806020019051810190610f289190611b2e565b610f5f5760405162461bcd60e51b815260206004820152600360248201526229aa2360e91b60448201526064015b60405180910390fd5b505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b1790529151600092839290871691610fc39190611b12565b6000604051808303816000865af19150503d8060008114611000576040519150601f19603f3d011682016040523d82523d6000602084013e611005565b606091505b509150915081801561102f57508051158061102f57508080602001905181019061102f9190611b2e565b6110605760405162461bcd60e51b8152602060048201526002602482015261534160f01b6044820152606401610f56565b5050505050565b60015460405163133f757160e31b815260048101839052600091829182916001600160a01b0316906399fbab889060240161018060405180830381865afa1580156110b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906110da9190611b66565b5050505097505050509450945050506040518060800160405280600260009054906101000a90046001600160a01b03166001600160a01b03168152602001826001600160801b03168152602001846001600160a01b03168152602001836001600160a01b03168152506003600086815260200190815260200160002060008201518160000160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060208201518160010160006101000a8154816001600160801b0302191690836001600160801b0316021790555060408201518160020160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555060608201518160030160006101000a8154816001600160a01b0302191690836001600160a01b0316021790555090505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663a9059cbb60e01b179052915160009283929087169161126f9190611b12565b6000604051808303816000865af19150503d80600081146112ac576040519150601f19603f3d011682016040523d82523d6000602084013e6112b1565b606091505b50915091508180156112db5750805115806112db5750808060200190518101906112db9190611b2e565b6110605760405162461bcd60e51b815260206004820152600260248201526114d560f21b6044820152606401610f56565b60008381526003602081905260409091208054600282015491909201546001600160a01b03928316929182169116611345828487611213565b610f5f818486611213565b6113958282604051602401611366929190611c47565b60408051601f198184030181529190526020810180516001600160e01b0316632d839cb360e21b1790526113cc565b5050565b6000806113a68484611c69565b905060006113b3826113d8565b6113c190600160601b611c69565b925050505b92915050565b6113d5816114c7565b50565b6000816000036113ea57506000919050565b600060016113f7846114e8565b901c6001901b9050600181848161141057611410611c80565b048201901c9050600181848161142857611428611c80565b048201901c9050600181848161144057611440611c80565b048201901c9050600181848161145857611458611c80565b048201901c9050600181848161147057611470611c80565b048201901c9050600181848161148857611488611c80565b048201901c905060018184816114a0576114a0611c80565b048201901c90506114c0818285816114ba576114ba611c80565b0461157c565b9392505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b600080608083901c156114fd57608092831c92015b604083901c1561150f57604092831c92015b602083901c1561152157602092831c92015b601083901c1561153357601092831c92015b600883901c1561154557600892831c92015b600483901c1561155757600492831c92015b600283901c1561156957600292831c92015b600183901c156113c65760010192915050565b600081831061158b57816114c0565b5090919050565b6001600160a01b03811681146113d557600080fd5b62ffffff811681146113d557600080fd5b8060020b81146113d557600080fd5b600080600080600080600060e0888a0312156115e257600080fd5b87356115ed81611592565b965060208801356115fd81611592565b9550604088013561160d816115a7565b9450606088013593506080880135925060a088013561162b816115b8565b915060c088013561163b816115b8565b8091505092959891949750929550565b60006020828403121561165d57600080fd5b5035919050565b6001600160801b03811681146113d557600080fd5b6000806040838503121561168c57600080fd5b82359150602083013561169e81611664565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600080600080608085870312156116d557600080fd5b84356116e081611592565b93506020850135925060408501359150606085013567ffffffffffffffff8082111561170b57600080fd5b818701915087601f83011261171f57600080fd5b813581811115611731576117316116a9565b604051601f8201601f19908116603f01168101908382118183101715611759576117596116a9565b816040528281528a602084870101111561177257600080fd5b82602086016020830137600060208483010152809550505050505092959194509250565b6000806000606084860312156117ab57600080fd5b505081359360208301359350604090920135919050565b600080600080600060a086880312156117da57600080fd5b85356117e581611592565b945060208601356117f581611592565b93506040860135611805816115a7565b94979396509394606081013594506080013592915050565b81516001600160a01b031681526101608101602083015161184960208401826001600160a01b03169052565b506040830151611860604084018262ffffff169052565b506060830151611875606084018260020b9052565b50608083015161188a608084018260020b9052565b5060a083015160a083015260c083015160c083015260e083015160e0830152610100808401518184015250610120808401516118d0828501826001600160a01b03169052565b505061014092830151919092015290565b80516118ec81611664565b919050565b6000806000806080858703121561190757600080fd5b84519350602085015161191981611664565b6040860151606090960151949790965092505050565b634e487b7160e01b600052601160045260246000fd5b818103818111156113c6576113c661192f565b815181526020808301516001600160a01b0316908201526040808301516001600160801b0390811691830191909152606092830151169181019190915260800190565b600080604083850312156119ae57600080fd5b505080516020909101519092909150565b6001600160801b038281168282160390808211156119df576119df61192f565b5092915050565b60005b83811015611a015781810151838201526020016119e9565b50506000910152565b60008151808452611a228160208601602086016119e6565b601f01601f19169290920160200192915050565b6000815160a08452611a4b60a0850182611a0a565b6020848101516001600160a01b031690860152604080850151908601526060808501519086015260809384015193909401929092525090919050565b6020815260006114c06020830184611a36565b600060208284031215611aac57600080fd5b5051919050565b600080600060608486031215611ac857600080fd5b8351611ad381611664565b602085015160409095015190969495509392505050565b80516118ec81611592565b600060208284031215611b0757600080fd5b81516114c081611592565b60008251611b248184602087016119e6565b9190910192915050565b600060208284031215611b4057600080fd5b815180151581146114c057600080fd5b80516118ec816115a7565b80516118ec816115b8565b6000806000806000806000806000806000806101808d8f031215611b8957600080fd5b8c516bffffffffffffffffffffffff81168114611ba557600080fd5b9b50611bb360208e01611aea565b9a50611bc160408e01611aea565b9950611bcf60608e01611aea565b9850611bdd60808e01611b50565b9750611beb60a08e01611b5b565b9650611bf960c08e01611b5b565b9550611c0760e08e016118e1565b94506101008d015193506101208d01519250611c266101408e016118e1565b9150611c356101608e016118e1565b90509295989b509295989b509295989b565b604081526000611c5a6040830185611a0a565b90508260208301529392505050565b80820281158282048414176113c6576113c661192f565b634e487b7160e01b600052601260045260246000fdfea2646970667358221220e91ecbd7c72f190d05f06ff960c6956721770439df11ca4543cbaf78d58a865664736f6c63430008140033";

type UniswapV3AdapterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapV3AdapterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniswapV3Adapter__factory extends ContractFactory {
  constructor(...args: UniswapV3AdapterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _swapRouter: PromiseOrValue<string>,
    _nonfungiblePositionManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UniswapV3Adapter> {
    return super.deploy(
      _swapRouter,
      _nonfungiblePositionManager,
      overrides || {}
    ) as Promise<UniswapV3Adapter>;
  }
  override getDeployTransaction(
    _swapRouter: PromiseOrValue<string>,
    _nonfungiblePositionManager: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _swapRouter,
      _nonfungiblePositionManager,
      overrides || {}
    );
  }
  override attach(address: string): UniswapV3Adapter {
    return super.attach(address) as UniswapV3Adapter;
  }
  override connect(signer: Signer): UniswapV3Adapter__factory {
    return super.connect(signer) as UniswapV3Adapter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV3AdapterInterface {
    return new utils.Interface(_abi) as UniswapV3AdapterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV3Adapter {
    return new Contract(address, _abi, signerOrProvider) as UniswapV3Adapter;
  }
}
