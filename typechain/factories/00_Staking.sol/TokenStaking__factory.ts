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
import type {
  TokenStaking,
  TokenStakingInterface,
} from "../../00_Staking.sol/TokenStaking";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_depositTokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_rewardTokenAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_rewardPercentageInYear",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_lockPeriod",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_maxStakeAmount",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AmountAllowanceBelowZero",
    type: "error",
  },
  {
    inputs: [],
    name: "DepositNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientRewardBalance",
    type: "error",
  },
  {
    inputs: [],
    name: "LockPeriodNotCompleted",
    type: "error",
  },
  {
    inputs: [],
    name: "NoStakedAmountFound",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardAlreadyClaimed",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardTransferFailed",
    type: "error",
  },
  {
    inputs: [],
    name: "RewardsNotClaimed",
    type: "error",
  },
  {
    inputs: [],
    name: "StakingPeriodHasNotStarted",
    type: "error",
  },
  {
    inputs: [],
    name: "WithdrawFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "RewardClaimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdraw",
    type: "event",
  },
  {
    inputs: [],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "depositTokenAddress",
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
    inputs: [],
    name: "lockPeriod",
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
    inputs: [],
    name: "maxStakeAmount",
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
    inputs: [],
    name: "rewardPercentageInYear",
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
    inputs: [],
    name: "rewardTokenAddress",
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
    inputs: [],
    name: "startTimeStaking",
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
        name: "",
        type: "address",
      },
    ],
    name: "users",
    outputs: [
      {
        internalType: "uint256",
        name: "depositAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "depositTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "stakedAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastRewardClaimTime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162001a9a38038062001a9a8339818101604052810190620000379190620001c7565b6200005367f054c8e9287e3f9460c01b620001a460201b60201c565b6200006f67a0f0a170988f7d4e60c01b620001a460201b60201c565b856000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550620000cb673af779de3248f4df60c01b620001a460201b60201c565b84600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555062000128675d194d774f8d234260c01b620001a460201b60201c565b836002819055506200014b676bf1222c232f58ee60c01b620001a460201b60201c565b826003819055506200016e67b7bb6a9b8f53787660c01b620001a460201b60201c565b81600481905550620001916713ef06b2948ec4b160c01b620001a460201b60201c565b8060058190555050505050505062000224565b50565b60008151905060018060a01b0381168114620001c257600080fd5b919050565b60008060008060008060c08789031215620001e157600080fd5b620001ec87620001a7565b9550620001fc60208801620001a7565b945060408701519350606087015192506080870151915060a087015190509295509295509295565b61186680620002346000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80633fd8b02f116100665780633fd8b02f146101115780635d80ca321461012f5780638fdf12dc1461014d578063a87430ba1461016b578063b6b55f251461019e5761009e565b8063125f9e33146100a357806323dc9e37146100c15780632ba25e8a146100df578063372500ab146100fd5780633ccfd60b14610107575b600080fd5b6100ab6101ba565b6040516100b8919061155c565b60405180910390f35b6100c96101e0565b6040516100d6919061155c565b60405180910390f35b6100e7610204565b6040516100f49190611575565b60405180910390f35b61010561020a565b005b61010f61083a565b005b610119610c24565b6040516101269190611575565b60405180910390f35b610137610c2a565b6040516101449190611575565b60405180910390f35b610155610c30565b6040516101629190611575565b60405180910390f35b61018560048036038101906101809190611586565b610c36565b60405161019594939291906115b8565b60405180910390f35b6101b860048036038101906101b391906115de565b610c66565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b61021e67c34d940776f3668660c01b610fb4565b6102326707b989d02856ec1a60c01b610fb4565b61024667bfa48bd680b28c0c60c01b610fb4565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020905061029d675b712565a147fcd160c01b610fb4565b6102b167165ac353d19ed7f160c01b610fb4565b6000816000015411610317576102d16714d860fa21d1c4d660c01b610fb4565b6102e5672fced4a3dd9c7b5860c01b610fb4565b6040517f411321ed00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61032b676f72361d922f0da760c01b610fb4565b61033f676bf81ea1c5cffb5160c01b610fb4565b61035367a6cc1747bc7a544c60c01b610fb4565b60008160020154146103b9576103736722b08027430de77360c01b610fb4565b6103876717bcf4f6c213b4c360c01b610fb4565b6040517fb3f8c0dc00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6103cd67c06e890fb932b06e60c01b610fb4565b6103e167d45e4430dc11090e60c01b610fb4565b6103f5673ab096adad75dd6760c01b610fb4565b600060045482600101546104099190611610565b905061041f67185d1f72c76c2f1c60c01b610fb4565b61043367a7f2e85b33cff31360c01b610fb4565b804210156104955761044f67ad47b6472a18f2ca60c01b610fb4565b61046367da91b45370f8acea60c01b610fb4565b6040517f2d92e16d00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b6104a967a502d627bf933a1460c01b610fb4565b6104bd675e82b9721c1f3cc660c01b610fb4565b6104d16726f08e24311fc89b60c01b610fb4565b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905061050c67097c7f97d733870460c01b610fb4565b61052067c04a0710d17ab24560c01b610fb4565b600061054f600254600086600301540361053e578560010154610544565b85600301545b428760000154610fb7565b905061056567f4bdb773a7f5b42c60c01b610fb4565b6105796759f9d5850411148860c01b610fb4565b808273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016105b3919061155c565b602060405180830381865afa1580156105d0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105f4919061162e565b10156106545761060e6784070c30284219f960c01b610fb4565b6106226762d6c301e7be097860c01b610fb4565b6040517ff16eeebd00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61066867eb10befd2483295260c01b610fb4565b61067c67d8af5c3e7970b0f560c01b610fb4565b610690670510d99ba8e468e860c01b610fb4565b8173ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33836040518363ffffffff1660e01b81526004016106cb92919061164a565b6020604051808303816000875af11580156106ea573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061070e919061166a565b61076c576107266774033d1ed6f8a30d60c01b610fb4565b61073a67923930506833563b60c01b610fb4565b6040517f78ecf41000000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610780676b5f0c7951e3654460c01b610fb4565b6107946766f047832699451760c01b610fb4565b836000015484600201819055506107b5671f8fa7a6fec6047660c01b610fb4565b4284600301819055506107d2675791210e58c5608b60c01b610fb4565b6107e66707f7e56b52c570ea60c01b610fb4565b3373ffffffffffffffffffffffffffffffffffffffff167f106f923f993c2149d49b4255ff723acafa1f2d94393f561d3eda32ae348f72418260405161082c9190611575565b60405180910390a250505050565b61084e676139bbf4da33c63c60c01b610fb4565b610862676409fda949a6d64360c01b610fb4565b61087667fc9f93cc8feac84160c01b610fb4565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506108cd67181076071ef0f6ee60c01b610fb4565b6108e1679be83ad71103c5c360c01b610fb4565b6000816002015411610947576109016796c34d9a4c0bb52e60c01b610fb4565b610915671ee266ccb9fde65d60c01b610fb4565b6040517fa0a8ca1f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b61095b6775e0b26942f8d93d60c01b610fb4565b61096f67602938c298a3ff0a60c01b610fb4565b6109836740b4d50dfb3e6ffa60c01b610fb4565b80600001548160020154146109ec576109a667390a7b797687929b60c01b610fb4565b6109ba675ab94dfa0b0ab29760c01b610fb4565b6040517f1085679b00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610a006764dea2637179103060c01b610fb4565b610a1467f70287b13aac50b660c01b610fb4565b610a28672b709374d7e3782360c01b610fb4565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050610a62675a927efb8bb959ef60c01b610fb4565b610a76673f32fae6c842bf4160c01b610fb4565b8073ffffffffffffffffffffffffffffffffffffffff1663a9059cbb3384600001546040518363ffffffff1660e01b8152600401610ab592919061164a565b6020604051808303816000875af1158015610ad4573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610af8919061166a565b610b5657610b1067f7097eb69c53ae2760c01b610fb4565b610b246735167385d67472dc60c01b610fb4565b6040517f750b219c00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610b6a676ce56fa35c28518660c01b610fb4565b610b7e67745e0152db5e5c8d60c01b610fb4565b610b9267eb153cf48d9cef7860c01b610fb4565b3373ffffffffffffffffffffffffffffffffffffffff167f884edad9ce6fa2440d8a54cc123490eb96d2768479d49ff9c7366125a94243648360000154604051610bdc9190611575565b60405180910390a2610bf867c8d31cfc7edd7dab60c01b610fb4565b60008260000181905550610c1667d1cbb4c8247d06a360c01b610fb4565b600082600201819055505050565b60045481565b60055481565b60035481565b60066020528060005260406000206000915090508060000154908060010154908060020154908060030154905084565b610c7a67474fb33a12eb573060c01b610fb4565b610c8e67550b52a14ecba1bb60c01b610fb4565b610ca26738ad8ec56ce4fb7560c01b610fb4565b600354421015610d0657610cc06774b3dc92e1b985dc60c01b610fb4565b610cd46705104eae709eb8d460c01b610fb4565b6040517f34a3735f00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610d1a67cf299fb24e36da0460c01b610fb4565b610d2e677e78bec93a3cc4a160c01b610fb4565b610d4267b327fa346ba355ed60c01b610fb4565b60008111610da457610d5e67a065391b901c3b3060c01b610fb4565b610d72678e7545b43e7353cd60c01b610fb4565b6040517f346d2bfe00000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b610db8671fa57fe75c61b69d60c01b610fb4565b610dcc673a1c4dc97b58d03060c01b610fb4565b610de067fffce6f26ab3bd7060c01b610fb4565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330846040518463ffffffff1660e01b8152600401610e3d93929190611696565b6020604051808303816000875af1158015610e5c573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e80919061166a565b50610e95679be831929a639a0260c01b610fb4565b610ea967bb50903d98b3741760c01b610fb4565b6000600660003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000209050610f006701b09302733fbc3460c01b610fb4565b81816000016000828254610f149190611610565b92505081905550610f2f6745ba79c7a53a18a060c01b610fb4565b428160010181905550610f4c67bc54649a553ecd0160c01b610fb4565b610f6067554d71a11cf47bae60c01b610fb4565b3373ffffffffffffffffffffffffffffffffffffffff167f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a158342604051610fa89291906116c1565b60405180910390a25050565b50565b6000610fcd6743da1c919adff46760c01b610fb4565b610fe167c79a2d3bb8cefd4860c01b610fb4565b610ff567d8d5ba58024128df60c01b610fb4565b69d3c21bcecceda1000000848461100c91906116d9565b611016878661103f565b8461102191906116f7565b61102b91906116f7565b611035919061172f565b9050949350505050565b600061105567983b407f3486ddec60c01b610fb4565b6110696707b7e65487f4473460c01b610fb4565b61107d67c57cdd1035e725af60c01b610fb4565b61108682611111565b80156110a257506110a167d3f175099409708160c01b611191565b5b806110bd57506110bc679a7f91efff7e022a60c01b61119c565b5b6110d7576201518061016e6110d291906116f7565b6110e9565b6201518061016d6110e891906116f7565b5b69021e19e0c9bab2400000846110ff91906116f7565b611109919061172f565b905092915050565b600061112767ca4f94ee9b75ad8560c01b6111a3565b61113b67378f3b596e98641960c01b6111a3565b61114f67ad27ab27600f81ea60c01b6111a3565b60006111686201518084611163919061172f565b6111a6565b505090506111806705d464964b35fa7860c01b6111a3565b611189816114ea565b915050919050565b600060019050919050565b6000919050565b50565b60008060006111bf67831331d1b8bb11e760c01b6111a3565b6111d3679ece60b37cfb415b60c01b6111a3565b6111e767e51c8ef1cc90a63160c01b6111a3565b60008490506112006722dd6e892001aa7460c01b6111a3565b61121467d67b132f130ad66960c01b6111a3565b600062253d8c62010bd983611229919061174a565b611233919061174a565b905061124967414ec168f33e550060c01b6111a3565b61125d67279b7d2e2f0ffd5460c01b6111a3565b600062023ab18260046112709190611777565b61127a91906117b3565b905061129067870346600f9dd04660c01b6111a3565b600460038262023ab16112a39190611777565b6112ad919061174a565b6112b791906117b3565b826112c291906117e9565b91506112d8677db9507d7f7a06dd60c01b6111a3565b6112ec67749910fa9a08a7eb60c01b6111a3565b600062164b096001846112ff919061174a565b610fa061130c9190611777565b61131691906117b3565b905061132c6713976172b09b363760c01b6111a3565b601f6004826105b561133e9190611777565b61134891906117b3565b8461135391906117e9565b61135d919061174a565b9250611373676d87afebc75b938060c01b6111a3565b61138767a7416e07e64e903060c01b6111a3565b600061098f8460506113999190611777565b6113a391906117b3565b90506113b967db4a892bb272c54b60c01b6111a3565b6113cd67614b796a8559014960c01b6111a3565b600060508261098f6113df9190611777565b6113e991906117b3565b856113f491906117e9565b905061140a67e3a3352dc651831e60c01b6111a3565b600b8261141791906117b3565b945061142d6766bea972d3228bf660c01b6111a3565b84600c61143a9190611777565b600283611447919061174a565b61145191906117e9565b9150611467679e05f72950b8aa6860c01b6111a3565b848360318661147691906117e9565b60646114829190611777565b61148c919061174a565b611496919061174a565b92506114ac67dad5b75032b975ab60c01b6111a3565b8298506114c367337ae8c066477e8e60c01b6111a3565b8197506114da67c4f7a77f91512bbe60c01b6111a3565b8096505050505050509193909250565b600061150067974c61526286b68a60c01b6111a3565b6115146735b12b3bda5edbc560c01b6111a3565b60006004836115239190611815565b14801561153d5750600060648361153a9190611815565b14155b8061155557506000610190836115539190611815565b145b9050919050565b600060208201905060018060a01b038316825292915050565b600060208201905082825292915050565b60006020828403121561159857600080fd5b813560018060a01b03811681146115ae57600080fd5b8091505092915050565b600060808201905085825284602083015283604083015282606083015295945050505050565b6000602082840312156115f057600080fd5b8135905092915050565b634e487b7160e01b600052601160045260246000fd5b6000828201905080821115611628576116276115fa565b5b92915050565b60006020828403121561164057600080fd5b8151905092915050565b600060408201905060018060a01b03841682528260208301529392505050565b60006020828403121561167c57600080fd5b8151801515811461168c57600080fd5b8091505092915050565b600060608201905060018060a01b038086168352808516602084015250826040830152949350505050565b60006040820190508382528260208301529392505050565b60008282039050818111156116f1576116f06115fa565b5b92915050565b600082820290508181048314821517611713576117126115fa565b5b92915050565b634e487b7160e01b600052601260045260246000fd5b60008261173f5761173e611719565b5b828204905092915050565b60008282019050828112600083128115811682821516171561176f5761176e6115fa565b5b505092915050565b60008282029050600160ff1b8314600083121615611798576117976115fa565b5b81810583148215176117ad576117ac6115fa565b5b92915050565b6000826117c3576117c2611719565b5b6000198314600160ff1b831416156117de576117dd6115fa565b5b828205905092915050565b60008282039050600083128282128116838313821516171561180e5761180d6115fa565b5b5092915050565b60008261182557611824611719565b5b82820690509291505056fea2646970667358221220d8f8bae0af0991d28af6471150e4ad69c558b6dfa0fb8df14df756c2040b2bd564736f6c63430008140033";

type TokenStakingConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TokenStakingConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TokenStaking__factory extends ContractFactory {
  constructor(...args: TokenStakingConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _depositTokenAddress: PromiseOrValue<string>,
    _rewardTokenAddress: PromiseOrValue<string>,
    _rewardPercentageInYear: PromiseOrValue<BigNumberish>,
    _startTime: PromiseOrValue<BigNumberish>,
    _lockPeriod: PromiseOrValue<BigNumberish>,
    _maxStakeAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TokenStaking> {
    return super.deploy(
      _depositTokenAddress,
      _rewardTokenAddress,
      _rewardPercentageInYear,
      _startTime,
      _lockPeriod,
      _maxStakeAmount,
      overrides || {}
    ) as Promise<TokenStaking>;
  }
  override getDeployTransaction(
    _depositTokenAddress: PromiseOrValue<string>,
    _rewardTokenAddress: PromiseOrValue<string>,
    _rewardPercentageInYear: PromiseOrValue<BigNumberish>,
    _startTime: PromiseOrValue<BigNumberish>,
    _lockPeriod: PromiseOrValue<BigNumberish>,
    _maxStakeAmount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _depositTokenAddress,
      _rewardTokenAddress,
      _rewardPercentageInYear,
      _startTime,
      _lockPeriod,
      _maxStakeAmount,
      overrides || {}
    );
  }
  override attach(address: string): TokenStaking {
    return super.attach(address) as TokenStaking;
  }
  override connect(signer: Signer): TokenStaking__factory {
    return super.connect(signer) as TokenStaking__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TokenStakingInterface {
    return new utils.Interface(_abi) as TokenStakingInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TokenStaking {
    return new Contract(address, _abi, signerOrProvider) as TokenStaking;
  }
}