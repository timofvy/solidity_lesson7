/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface TokenStakingInterface extends utils.Interface {
  functions: {
    "claimRewards()": FunctionFragment;
    "deposit(uint256)": FunctionFragment;
    "depositTokenAddress()": FunctionFragment;
    "lockPeriod()": FunctionFragment;
    "maxStakeAmount()": FunctionFragment;
    "rewardPercentageInYear()": FunctionFragment;
    "rewardTokenAddress()": FunctionFragment;
    "startTimeStaking()": FunctionFragment;
    "users(address)": FunctionFragment;
    "withdraw()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "claimRewards"
      | "deposit"
      | "depositTokenAddress"
      | "lockPeriod"
      | "maxStakeAmount"
      | "rewardPercentageInYear"
      | "rewardTokenAddress"
      | "startTimeStaking"
      | "users"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "claimRewards",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "deposit",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "depositTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "lockPeriod",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "maxStakeAmount",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardPercentageInYear",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "rewardTokenAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "startTimeStaking",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "users",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(functionFragment: "withdraw", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "claimRewards",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "depositTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "lockPeriod", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "maxStakeAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardPercentageInYear",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rewardTokenAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "startTimeStaking",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "users", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "Deposit(address,uint256,uint256)": EventFragment;
    "RewardClaimed(address,uint256)": EventFragment;
    "Withdraw(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RewardClaimed"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Withdraw"): EventFragment;
}

export interface DepositEventObject {
  user: string;
  amount: BigNumber;
  time: BigNumber;
}
export type DepositEvent = TypedEvent<
  [string, BigNumber, BigNumber],
  DepositEventObject
>;

export type DepositEventFilter = TypedEventFilter<DepositEvent>;

export interface RewardClaimedEventObject {
  user: string;
  amount: BigNumber;
}
export type RewardClaimedEvent = TypedEvent<
  [string, BigNumber],
  RewardClaimedEventObject
>;

export type RewardClaimedEventFilter = TypedEventFilter<RewardClaimedEvent>;

export interface WithdrawEventObject {
  user: string;
  amount: BigNumber;
}
export type WithdrawEvent = TypedEvent<
  [string, BigNumber],
  WithdrawEventObject
>;

export type WithdrawEventFilter = TypedEventFilter<WithdrawEvent>;

export interface TokenStaking extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TokenStakingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    claimRewards(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    depositTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    lockPeriod(overrides?: CallOverrides): Promise<[BigNumber]>;

    maxStakeAmount(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardPercentageInYear(overrides?: CallOverrides): Promise<[BigNumber]>;

    rewardTokenAddress(overrides?: CallOverrides): Promise<[string]>;

    startTimeStaking(overrides?: CallOverrides): Promise<[BigNumber]>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        depositAmount: BigNumber;
        depositTime: BigNumber;
        stakedAmount: BigNumber;
        lastRewardClaimTime: BigNumber;
      }
    >;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  claimRewards(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  deposit(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  depositTokenAddress(overrides?: CallOverrides): Promise<string>;

  lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

  maxStakeAmount(overrides?: CallOverrides): Promise<BigNumber>;

  rewardPercentageInYear(overrides?: CallOverrides): Promise<BigNumber>;

  rewardTokenAddress(overrides?: CallOverrides): Promise<string>;

  startTimeStaking(overrides?: CallOverrides): Promise<BigNumber>;

  users(
    arg0: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, BigNumber, BigNumber] & {
      depositAmount: BigNumber;
      depositTime: BigNumber;
      stakedAmount: BigNumber;
      lastRewardClaimTime: BigNumber;
    }
  >;

  withdraw(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    claimRewards(overrides?: CallOverrides): Promise<void>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    depositTokenAddress(overrides?: CallOverrides): Promise<string>;

    lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    maxStakeAmount(overrides?: CallOverrides): Promise<BigNumber>;

    rewardPercentageInYear(overrides?: CallOverrides): Promise<BigNumber>;

    rewardTokenAddress(overrides?: CallOverrides): Promise<string>;

    startTimeStaking(overrides?: CallOverrides): Promise<BigNumber>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, BigNumber, BigNumber] & {
        depositAmount: BigNumber;
        depositTime: BigNumber;
        stakedAmount: BigNumber;
        lastRewardClaimTime: BigNumber;
      }
    >;

    withdraw(overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "Deposit(address,uint256,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null,
      time?: null
    ): DepositEventFilter;
    Deposit(
      user?: PromiseOrValue<string> | null,
      amount?: null,
      time?: null
    ): DepositEventFilter;

    "RewardClaimed(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): RewardClaimedEventFilter;
    RewardClaimed(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): RewardClaimedEventFilter;

    "Withdraw(address,uint256)"(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
    Withdraw(
      user?: PromiseOrValue<string> | null,
      amount?: null
    ): WithdrawEventFilter;
  };

  estimateGas: {
    claimRewards(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    depositTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    lockPeriod(overrides?: CallOverrides): Promise<BigNumber>;

    maxStakeAmount(overrides?: CallOverrides): Promise<BigNumber>;

    rewardPercentageInYear(overrides?: CallOverrides): Promise<BigNumber>;

    rewardTokenAddress(overrides?: CallOverrides): Promise<BigNumber>;

    startTimeStaking(overrides?: CallOverrides): Promise<BigNumber>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    claimRewards(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    deposit(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    depositTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    lockPeriod(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    maxStakeAmount(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rewardPercentageInYear(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rewardTokenAddress(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    startTimeStaking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    users(
      arg0: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    withdraw(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}